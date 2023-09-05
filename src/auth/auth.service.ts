// user.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../users/user.repository';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { User } from 'src/users/entities/user.schema';

import { UserRegistrationException } from './exceptions/user-registration.exception';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: RegisterUserDto): Promise<any> {
    const { email } = dto;

    const userExists = await this.userRepository.findUserByEmail(email);

    if (userExists) {
      throw new UserRegistrationException('User already exists');
    }

    const newUser = await this.userRepository.registerUser(dto);

    if (newUser) {
      return { message: 'Your account has been successfully created' };
    } else {
      throw new InternalServerErrorException(
        'An error occurred while registering the user',
      );
    }
  }

  async signIn(dto: LoginUserDto): Promise<User> {
    const { email } = dto;

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const { password, ...userData } = user.toObject();

    return userData;
  }

  signUser(userId: number, email: string, username: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      username,
    });
  }
}
