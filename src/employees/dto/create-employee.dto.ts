import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Dmitry', description: 'Имя сотрудника' })
  @IsString({ message: 'Name is required field' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'dima@gmail.com', description: 'Почта сотрудника' })
  @IsEmail({}, { message: 'Invalid email address.' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'Moskalenko', description: 'Фамилия сотрудника' })
  @IsString({ message: 'Surname is required field' })
  @IsNotEmpty()
  readonly surname: string;

  @ApiProperty({ example: '25', description: 'Возраст сотрудника' })
  @IsInt({ message: 'Age is required field and must be a number.' })
  readonly age: number;
}
