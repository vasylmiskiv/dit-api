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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication') // Опционально, тег для группировки маршрутов
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Register a new user.',
  })
  @ApiCreatedResponse({
    description: 'User successfully registered.',
    type: RegisterUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data provided.',
  })
  async registerUser(@Body() dto: RegisterUserDto) {
    const user = await this.authService.signUp(dto);

    return user;
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'Sign in a user',
    description: 'Sign in a user with credentials.',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in.',
    type: LoginUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data provided.',
  })
  async loginUser(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signIn(dto);

    const token = this.authService.signUser(user.id, user.email, user.username);

    // this.setJwtCookie(response, token);

    return { user, token };
  }

  // Add token to cookies if needed
  // private setJwtCookie(response: Response, token: string) {
  //   response.cookie('jwt', token, {
  //     httpOnly: true,
  //   });
  // }
}
