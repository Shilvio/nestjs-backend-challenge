import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, LoginDto } from '@app/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  registerUser(createUserDto: CreateUserDto) {
    return this.authClient.send('create_user', createUserDto).pipe(
      catchError((err) => {
        
        const statusCode = err?.statusCode || err?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = err?.message || 'Errore interno';

        return throwError(
          () => new HttpException({ statusCode, message }, statusCode),
        );
      }),
    );
  }

  login(loginDto: LoginDto) {
    return this.authClient.send('login_user', loginDto).pipe(
       catchError((err) => throwError(() => new HttpException(err.message, err.status || 500)))
    );
  }

  getUsers() {
    return this.authClient.send('get_users', {});
  }
}