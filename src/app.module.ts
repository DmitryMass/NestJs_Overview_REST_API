import { config } from 'dotenv';
config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//
import { EmployeeModule } from './employees/employee.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EmployeeModule, MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
