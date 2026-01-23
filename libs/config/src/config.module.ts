import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// use joi to verify and handle env variables
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        GATEWAY_PORT: Joi.number().default(3000),
        AUTH_PORT: Joi.number().default(3001),
        
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class CommonConfigModule {}
