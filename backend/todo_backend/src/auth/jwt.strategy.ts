/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: (req: Request) => this.extractFromCookie(req),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SECRETKEY00',
    });
  }

  async validate(payload: { id: number; email: string }) {
    const user = await this.userService.findOne(payload.email);
    return user.success ? user.data : null;
  }

  extractFromCookie(req: Request): string | null {
    if (req && req.cookies && typeof req.cookies === 'object') {
      return (req.cookies as Record<string, string>)['auth_token'] || null;
    }
    return null;
  }
}
