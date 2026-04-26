/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password!: string;
}
