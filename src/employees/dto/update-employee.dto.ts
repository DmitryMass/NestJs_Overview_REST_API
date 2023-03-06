import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateEmployeeDto {
  // @ApiPropert для swagger
  @IsString({ message: 'Name is required field' })
  @IsNotEmpty()
  readonly name: string;

  @IsEmail({}, { message: 'Invalid email address.' })
  @IsNotEmpty()
  readonly email: string;

  @IsString({ message: 'Surname is required field' })
  @IsNotEmpty()
  readonly surname: string;

  @IsInt({ message: 'Age is required field and must be a number.' })
  readonly age: number;
}
