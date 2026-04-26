import { inject, Injectable, signal } from '@angular/core';
import { TaskService } from './task.service';

@Injectable({ providedIn: 'root' })
export class TaskModalService {
    isOpen = signal(false);

    open() { this.isOpen.set(true); }
    
    close() { this.isOpen.set(false); }

    toggle() { this.isOpen.update(v => !v); }
}