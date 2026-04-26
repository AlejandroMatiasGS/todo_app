import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos extra
      forbidNonWhitelisted: true, // error si mandan extras,
      transform: true, // transforma tipos (ej: string a number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
