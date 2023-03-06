import { Employee } from './schemas/employee.schema';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Controller, HttpStatus, ValidationPipe } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get()
  // @Redirect('https://google.com', 301) redirect after request to server
  getEmployees(): Promise<Employee[]> {
    return this.employeeService.getAll();
  }

  @Get(':id')
  getOneEmployee(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.getOneEmployee(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createEmployee(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
      }),
    )
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Delete(':id')
  removeEmployee(@Param('id') id: string) {
    return this.employeeService.removeEmployee(id);
  }

  @Put(':id')
  updateEmployee(
    @Body()
    updateEmployeeDto: UpdateEmployeeDto,
    @Param('id') id: string,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }
}
