// user.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserRegistrationException } from './exceptions/user-registration.exception';
import { User } from 'src/users/entities/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: RegisterUserDto): Promise<any> {
    const userExists = await this.userRepository.findUserByEmail(dto);

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
    const user = await this.userRepository.findUserByEmail(dto);

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