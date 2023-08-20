import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(3, 10)
  @IsString()
  password: string;
}
