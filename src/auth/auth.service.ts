import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async registration(
    registrationDto: RegistrationDto,
  ): Promise<{ token: string }> {
    const { name, email, password } = registrationDto;

    const hashPassword = await bcrypt.hash(password, 10);
    const isUser = await this.userModel.findOne({ email });
    if (isUser) {
      throw new UnauthorizedException('Email is already exist');
    }
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const isWrongPassword = await bcrypt.compare(password, user.password);

    if (!isWrongPassword) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
