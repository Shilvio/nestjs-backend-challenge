import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '@app/common';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  registerUser(createUserDto: CreateUserDto) {
    return this.authClient.send('create_user', createUserDto);
  }

  getUsers() {
    return this.authClient.send('get_users', {});
  }
}
