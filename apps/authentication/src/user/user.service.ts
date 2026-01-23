import { Injectable, UnauthorizedException,ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from '@app/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './user.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    // repository injection
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async createUser(data: CreateUserDto) {

    const existingUser = await this.usersRepository.findOne({ email: data.email });
    
    if (existingUser) {
        throw new RpcException({
            statusCode: 409,
            message: 'Email already registered'
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userToSave = {
      ...data,
      password: hashedPassword,
    };

    // call repository and create a new user
    return this.usersRepository.create(userToSave);
  }

  async validateUser(data: LoginDto) {
    // call repository and find a user
    const user = await this.usersRepository.findOne({ email: data.email });

    if (!user) {
      throw new RpcException({
        statusCode: 401,
        message: 'Credentials are not valid'
      });
    }

    // proceeds with the uiser authentication
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Bad credentials');
    }
    
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUsers() {
    return this.usersRepository.find();
  }
}