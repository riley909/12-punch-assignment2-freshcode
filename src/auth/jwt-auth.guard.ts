import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('jwtAuthGuardErr', err);
    console.log('jwtAuthGuardUser', user);
    if (err || !user) throw err || new UnauthorizedException('JWT Auth Guard');
    return user;
  }
}