import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from '@app/common';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto) {
    return this.usersRepository.create(data);
  }

  async getUsers() {
    return this.usersRepository.find();
  }
}
