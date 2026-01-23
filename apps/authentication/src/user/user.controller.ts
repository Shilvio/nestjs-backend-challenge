import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './user.service';
import { CreateUserDto, LoginDto } from '@app/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  handleCreateUser(@Payload() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @MessagePattern('login_user')
  handleLogin(@Payload() data: LoginDto) {
    return this.usersService.validateUser(data);
  }

  @MessagePattern('get_users')
  handleGetUsers() {
    return this.usersService.getUsers();
  }
}