import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MiResponse } from 'src/models/response';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(id: number): Promise<MiResponse> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          authorId: id,
        },
      });

      if (!tasks) {
        return {
          success: false,
          message: 'No hay tareas para este usuario',
          data: [],
        };
      }

      return {
        success: true,
        message: '',
        data: tasks,
      };
    } catch {
      return {
        success: false,
        message: 'Hubo un error al obtener las tareas.',
        data: [],
      };
    }
  }

  async getTask(text: string): Promise<MiResponse> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          OR: [
            { title: { contains: text } },
            { description: { contains: text } },
          ],
        },
      });

      if (!tasks) {
        return {
          success: false,
          message: 'No se encontraron tareas con el texto proporcionado.',
          data: [],
        };
      }

      return {
        success: true,
        message: '',
        data: tasks,
      };
    } catch {
      return {
        success: false,
        message: 'Hubo un error al obtener las tareas.',
        data: [],
      };
    }
  }

  async createTask(dto: CreateTaskDto, userId: number): Promise<MiResponse> {
    try {
      const task = await this.prisma.task.create({
        data: {
          title: dto.title,
          description: dto.description,
          authorId: userId,
        },
      });

      return {
        success: true,
        message: 'Tarea creada exitosamente.',
        data: task,
      };
    } catch {
      return {
        success: false,
        message: 'Hubo un error al crear la tarea.',
        data: [],
      };
    }
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<MiResponse> {
    try {
      const task = await this.prisma.task.update({
        where: { id: id },
        data: {
          title: dto.title,
          description: dto.description,
        },
      });

      return {
        success: true,
        message: 'Tarea actualizada exitosamente.',
        data: task,
      };
    } catch {
      return {
        success: false,
        message: 'Hubo un error al actualizar la tarea.',
        data: [],
      };
    }
  }

  async deleteTask(id: number): Promise<MiResponse> {
    try {
      await this.prisma.task.delete({
        where: { id: id },
      });

      return {
        success: true,
        message: 'Tarea eliminada exitosamente.',
        data: [],
      };
    } catch {
      return {
        success: false,
        message: 'Hubo un error al eliminar la tarea.',
        data: [],
      };
    }
  }
}
