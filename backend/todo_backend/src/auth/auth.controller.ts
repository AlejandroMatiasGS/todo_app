import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() cr: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const mires = await this.authService.login(cr.email, cr.password);

    if (mires.success === false) {
      return mires;
    }

    res.cookie('auth_token', mires.data, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600000,
      path: '/',
    });

    return { success: true };
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    });

    return this.authService.logout();
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  check() {
    return { success: true };
  }
}
