import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty({ example: 'Dmitry', description: 'Имя пользователя' })
  @IsString({ message: 'Name is required field' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'dima@gmail.com', description: 'Почта пользователя' })
  @IsEmail({}, { message: 'Invalid email address.' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'example54321', description: 'Пароль пользователя' })
  @IsString({ message: 'Password is required field' })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
