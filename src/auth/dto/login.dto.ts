import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
