import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { CreateUserDto, LoginDto } from '@app/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createUser(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userToSave = {
      ...data,
      password: hashedPassword,
    };

    return this.userModel.create(userToSave);
  }

  async validateUser(data: LoginDto) {
    const user = await this.userModel.findOne({ email: data.email });

    if (!user) {
      throw new UnauthorizedException('Credenziali errate');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenziali errate');
    }
    
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUsers() {
    return this.userModel.find().select('-password').exec();
  }
}