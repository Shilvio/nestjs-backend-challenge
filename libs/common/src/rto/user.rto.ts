import { Expose, Transform } from 'class-transformer';

export class UserRto {
  @Expose()
  name: string;

  @Expose()
  email: string;
  
}