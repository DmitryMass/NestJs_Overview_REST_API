import { config } from 'dotenv';
config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//
import { EmployeeModule } from './employees/employee.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EmployeeModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
