import { ApiProperty } from '@nestjs/swagger';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
  })
  _id: string;

  @ApiProperty({ example: 'Dmitry', description: 'Имя пользователя' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'dima@gmail.com', description: 'Почта пользователя' })
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({ example: 'example54321', description: 'Пароль' })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
