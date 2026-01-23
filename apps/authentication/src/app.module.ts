import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';
import { ConfigService } from '@nestjs/config';
import { CommonConfigModule } from '@app/config';
import { UsersController } from './user/user.controlle';

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
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
