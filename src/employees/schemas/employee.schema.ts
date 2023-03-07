import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
  })
  _id: string;

  @ApiProperty({ example: 'Dmitry', description: 'Имя сотрудника' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'Moskalenko', description: 'Фамилия сотрудника' })
  @Prop({ required: true })
  surname: string;

  @ApiProperty({ example: 'dima@gmail.com', description: 'Почта сотрудника' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: '25', description: 'Возраст сотрудника' })
  @Prop({ required: true })
  age: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
