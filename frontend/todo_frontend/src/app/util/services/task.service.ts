import { inject, Injectable, resource, signal } from '@angular/core';
import { Task } from '../../model/task';
import { firstValueFrom, map, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MiResponse } from '../../model/miresponse';
import { toast } from 'ngx-sonner';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../components/dialog/dialog';
import { TaskModalService } from './task.modal.service';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private dialog: MatDialog) { }

    selTasks = signal<Task[]>([]);
    selTask = signal<Task | null>(null);
    http = inject(HttpClient);
    taskModalSer = inject(TaskModalService);

    title = signal('');
    description = signal('');

    private tasksResource = resource({
        loader: () =>
            firstValueFrom(
                this.http
                    .get<{ success: boolean; data: Task[] }>('http://localhost:3000/tasks', {
                        withCredentials: true,
                    })
                    .pipe(map((res) => res.data))
            ),
    });

    tasks      = this.tasksResource.value;
    isLoading  = this.tasksResource.isLoading;
    error      = this.tasksResource.error;

    toggle(tasks: Task) {
        this.selTasks.update((prevTasks) => {
            const exists = prevTasks.some((t) => t.id === tasks.id);
            if (exists) {
                return prevTasks.filter((t) => t.id !== tasks.id);
            } else {
                return [...prevTasks, tasks];
            }
        });
    }

    isSelected(id: number) {
        return this.selTasks().some((t) => t.id === id);
    }

    selectTask(task: Task) {
        this.selTask.set(task);
        this.title.set(task.title);
        this.description.set(task.description);
    }

    deselectTask() {
        this.selTask.set(null);
        this.title.set('');
        this.description.set('');
    }

    save() {
        if(!this.checkVoids()) return;

        const dialog = this.dialog.open(Dialog, {
            data: {
                message: '¿Estás seguro de que quieres actualizar esta nota?'
            }
        });

        dialog.afterClosed().subscribe((result) => {
            if (result) {
                this.http.patch<MiResponse>(`http://localhost:3000/tasks/${this.selTask()?.id}`, {
                    title: this.title(),
                    description: this.description()
                }, {
                    withCredentials: true,
                }).subscribe({
                    next: (res) => {
                        toast.success('Éxito', { description: res.message });
                        const t = res.data as Task;

                        this.tasks.update((prevTasks) => {
                            return prevTasks?.map((task) => (task.id === t.id ? t : task));
                        });

                        this.taskModalSer.close();
                        this.deselectTask();
                    },
                    error: (err) => {
                        toast.error('Error', { description: err.message })
                    },
                });
            } else {
                return;
            }
        });
    }

    create() {
        if(!this.checkVoids()) return;

        const dialog = this.dialog.open(Dialog, {
            data: {
                message: '¿Estás seguro de que quieres crear esta nota?'
            }
        });

        console.log(this.tasks())

        dialog.afterClosed().subscribe((result) => {
            if (result) {
                this.http.post<MiResponse>('http://localhost:3000/tasks', {
                    title: this.title(),
                    description: this.description()
                }, {
                    withCredentials: true,
                }).subscribe({
                    next: (res) => {
                        toast.success('Éxito', { description: res.message });
                        const t = res.data as Task;

                        console.log(t);

                        this.tasks.update((prevTasks) => {
                            return prevTasks ? [...prevTasks, t] : [t];
                        });

                        this.taskModalSer.close();
                        this.deselectTask();
                    },
                    error: (err) => {
                        toast.error('Error', { description: 'No se pudo crear la tarea. \n' + err.message })
                    }                    
                });
            } else {
                return;
            }
        });
    }

    delete() {
        if(this.selTasks().length === 0) {
            toast.error('Error', { description: 'No hay tareas seleccionadas para eliminar.' });
            return;
        }

        const dialog = this.dialog.open(Dialog, {
            data: {
                message: '¿Estás seguro de que quieres eliminar estas notas?'
            }
        });

        dialog.afterClosed().subscribe((result) => {
            if (result) {
                // Crear array de observables para las llamadas HTTP
                const deleteObservables = this.selTasks().map((t) =>
                    this.http.delete<MiResponse>(`http://localhost:3000/tasks/${t.id}`, {
                        withCredentials: true,
                    })
                );

                // Esperar a que todas las llamadas terminen
                forkJoin(deleteObservables).subscribe({
                    next: (responses) => {
                        // Todas las eliminaciones fueron exitosas
                        toast.success('Éxito', { description: 'Tareas eliminadas correctamente.' });

                        // Actualizar el signal removiendo las tareas eliminadas
                        this.tasks.update((prevTasks) => {
                            return prevTasks?.filter((t) => !this.selTasks().some(selected => selected.id === t.id));
                        });
                    },
                    error: (err) => {
                        toast.error('Error', { description: 'No se pudieron eliminar algunas tareas.' });
                    }
                });
            } else {
                return;
            }
        });
    }

    private checkVoids() {
        if(!this.title().trim() || !this.description().trim()) {
            toast.error('Error', { description: 'El título y la descripción no pueden estar vacíos.' });
            return false;
        }

        return true;
    }
}
