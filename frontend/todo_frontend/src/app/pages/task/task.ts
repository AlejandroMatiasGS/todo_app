import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { TaskModalService } from '../../util/services/task.modal.service';
import { Task as _Task } from '../../model/task';
import { TaskService } from '../../util/services/task.service';
import { LucideAngularModule } from "lucide-angular";
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-task-modal',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class TaskModal {
    taskModalSer = inject(TaskModalService);
    taskSer = inject(TaskService);
}
