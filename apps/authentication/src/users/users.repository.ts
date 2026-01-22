import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto } from '@app/common';

@Injectable()
export class UsersRepository {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async find(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
