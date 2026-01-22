import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { CommonConfigModule } from '@app/config';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    CommonConfigModule,

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    UsersModule,
  ],
  controllers: [AuthenticationController],
  providers: [],
})
export class AppModule {}
