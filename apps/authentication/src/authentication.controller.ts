import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users/users.service';
import { CreateUserDto } from '@app/common';

@Controller()
export class AuthenticationController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  handleCreateUser(@Payload() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @MessagePattern('get_users')
  handleGetUsers() {
    return this.usersService.getUsers();
  }
}
