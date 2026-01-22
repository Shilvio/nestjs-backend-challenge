import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule], // Carichiamo il nostro modulo di autenticazione
  controllers: [],
  providers: [],
})
export class AppModule {}
