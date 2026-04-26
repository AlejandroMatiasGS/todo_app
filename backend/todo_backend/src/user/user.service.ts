import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MiResponse } from 'src/models/response';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<MiResponse> {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: dto.password,
        },
      });

      return {
        success: true,
        data: user,
        message: 'Usuario creado con éxito',
      };
    } catch {
      return {
        success: false,
        data: null,
        message: 'Error al crear el usuario',
      };
    }
  }

  async findOne(email: string): Promise<MiResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return {
          success: false,
          data: null,
          message: 'Usuario no encontrado',
        };
      }

      return {
        success: true,
        data: user,
        message: 'Usuario encontrado',
      };
    } catch {
      return {
        success: false,
        message: 'Hubo un error al buscar el usuario',
        data: null,
      };
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<MiResponse> {
    try {
      await this.prisma.user.update({
        where: { id: id },
        data: dto,
      });

      return {
        success: true,
        message: 'Usuario actualizado con éxito',
        data: null,
      };
    } catch {
      return {
        success: false,
        message: 'Error al actualizar el usuario',
        data: null,
      };
    }
  }

  async remove(id: number): Promise<MiResponse> {
    try {
      await this.prisma.user.delete({
        where: { id: id },
      });

      return {
        success: true,
        message: 'Usuario eliminado con éxito',
        data: null,
      };
    } catch {
      return {
        success: false,
        message: 'Error al eliminar el usuario',
        data: null,
      };
    }
  }
}
