import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersRepository {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save() as unknown as User; 
  }

  async findOne(filter: any): Promise<User | null> {
    return this.userModel.findOne(filter).exec();
  }
  
  async find(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }
}