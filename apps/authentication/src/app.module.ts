import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { UsersController } from './user/user.controller';
import { UsersService } from './user/user.service';
import { CommonConfigModule } from '@app/config';

@Module({
  imports: [
    CommonConfigModule,
    MongooseModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_URI'),
        }),
        inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}