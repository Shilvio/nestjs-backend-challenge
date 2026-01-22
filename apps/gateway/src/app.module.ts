import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CommonConfigModule } from '@app/config';

@Module({
  imports: [
    CommonConfigModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 10000,
      max: 100,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
