import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// simple setup of the JWT Guard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}