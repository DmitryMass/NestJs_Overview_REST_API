import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @Post('/registration')
  registration(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
      }),
    )
    registrationDto: RegistrationDto,
  ): Promise<{ token: string }> {
    return this.authService.registration(registrationDto);
  }

  @ApiOperation({ summary: 'Логин' })
  @Post('/login')
  login(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
      }),
    )
    loginDto: LoginDto,
  ): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
