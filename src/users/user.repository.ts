import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async registerUser(newUser: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const createdUser = await this.userModel.create({
      ...newUser,
      password: hashedPassword,
    });

    return createdUser;
  }

  async findUserByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });

    return user;
  }
}
