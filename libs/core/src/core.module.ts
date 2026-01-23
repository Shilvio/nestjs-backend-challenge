import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [PassportModule, JwtStrategy, JwtAuthGuard],
})
export class CoreModule {}