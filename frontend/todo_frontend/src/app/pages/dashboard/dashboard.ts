import { Component, inject, OnInit, resource, signal, viewChild } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Task as TaskComp } from '../../components/task/task';
import { Task } from '../../model/task';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { TaskService } from '../../util/services/task.service';
import { LucideAngularModule } from 'lucide-angular';
import { TaskModal } from '../task/task';
import { TaskModalService } from '../../util/services/task.modal.service';


@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [Navbar, TaskComp, LucideAngularModule, TaskModal],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
})
export class Dashboard {

    private http = inject(HttpClient);
    taskService = inject(TaskService);
    taskModalSer = inject(TaskModalService);
}
