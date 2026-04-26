/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'src/generated/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

    super({
      adapter: adapter,
      log: ['query', 'error', 'warn', 'info'],
    });
  }
  
  async onModuleInit() {
    await this.$connect();
  }
}
