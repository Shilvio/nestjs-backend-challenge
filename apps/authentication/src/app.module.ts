import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Mongo connection via Docker
    MongooseModule.forRoot('mongodb://localhost:27017/challenge'),
    // Import users module
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
