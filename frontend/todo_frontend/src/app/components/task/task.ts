import { Component, inject, input } from '@angular/core';
import { TaskService } from '../../util/services/task.service';
import { Task as _Task } from '../../model/task';
import { TaskModalService } from '../../util/services/task.modal.service';

@Component({
  standalone: true,
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrls: ['./task.css'],
  host: {
    class: 'block'
  }
})
export class Task {
    task = input.required<_Task>();
    taskSer = inject(TaskService);
    taskModalSer = inject(TaskModalService);
}
