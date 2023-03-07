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
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Работа с сотрудниками')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Получение всех сотрудников' })
  @ApiResponse({ status: 200, type: [Employee] })
  @Get()
  // @Redirect('https://google.com', 301) redirect after request to server
  getEmployees(): Promise<Employee[]> {
    return this.employeeService.getAll();
  }

  @ApiOperation({ summary: 'Получение одного сотрудника' })
  @ApiResponse({ status: 200, type: Employee })
  @Get(':id')
  getOneEmployee(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.getOneEmployee(id);
  }

  @ApiOperation({ summary: 'Создание нового сотрудника' })
  @ApiResponse({ status: 200, type: Employee })
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

  @ApiOperation({ summary: 'Удаление сотрудника' })
  @ApiResponse({ status: 200, type: Employee })
  @Delete(':id')
  removeEmployee(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.removeEmployee(id);
  }

  @ApiOperation({ summary: 'Изменение сотрудника' })
  @ApiResponse({ status: 200, type: Employee })
  @Put(':id')
  updateEmployee(
    @Body()
    updateEmployeeDto: UpdateEmployeeDto,
    @Param('id') id: string,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }
}
