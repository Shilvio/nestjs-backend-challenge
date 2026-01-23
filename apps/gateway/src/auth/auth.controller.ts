import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, UserRto } from '@app/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '@app/core/auth/jwt-auth.guard';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }


  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiBearerAuth()
  getUsers() {
    console.log('Calling auth microservice protected route');
    
    return this.authService.getUsers().pipe(
      map((users) => 
        plainToInstance(UserRto, users, { excludeExtraneousValues: true })
      )
    );
  }
  
}
