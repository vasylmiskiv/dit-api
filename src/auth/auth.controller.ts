import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async registerUser(@Body() dto: RegisterUserDto) {
    const user = await this.authService.signUp(dto);

    return user;
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async loginUser(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signIn(dto);

    const token = this.authService.signUser(user.id, user.email, user.username);

    this.setJwtCookie(response, token);

    return user;
  }

  private setJwtCookie(response: Response, token: string) {
    response.cookie('jwt', token, {
      httpOnly: true,
    });
  }
}
