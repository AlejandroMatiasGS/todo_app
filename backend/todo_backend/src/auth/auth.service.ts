/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MiResponse } from 'src/models/response';
import { User } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string): Promise<MiResponse> {
    const user = (await this.userService.findOne(email)).data as User;

    if (!user) {
      return {
        success: false,
        message: 'No existe un usuario con ese email',
        data: null,
      };
    }

    const isValidPass = await bcryptjs.compare(password, user.password);

    if (!isValidPass) {
      return {
        success: false,
        message: 'Contraseña incorrecta',
        data: null,
      };
    }

    const payload = { id: user.id, email: user.email };

    return {
      success: true,
      message: 'Login exitoso',
      data: await this.jwt.signAsync(payload),
    };
  }

  async register(dto: CreateUserDto): Promise<MiResponse> {
    const res = await this.userService.findOne(dto.email);

    if (res.success) {
      return {
        success: false,
        message: 'Ya existe un usuario con ese email',
        data: null,
      };
    }

    try {
      const hashedPassword = await bcryptjs.hash(dto.password, 10);

      dto.password = hashedPassword;

      await this.userService.create(dto);

      return {
        success: true,
        message: 'Usuario creado exitosamente',
        data: null,
      };
    } catch {
      return {
        success: false,
        message: 'Error al crear el usuario',
        data: null,
      };
    }
  }

  logout() {
    return {
      success: true,
      message: 'Logout exitoso',
      data: null,
    };
  }
}
