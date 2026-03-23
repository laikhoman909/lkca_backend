import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * Guard that protects routes by requiring a valid JWT token
 * Use @UseGuards(JwtAuthGuard) on controller methods or entire controllers
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
          throw new HttpException('Session Expired', HttpStatus.UNAUTHORIZED);
        }
        return user;
      }

      canActivate(
        context: ExecutionContext,
      ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Inside JWT AuthGuard canActivate');
        const request = context.switchToHttp().getRequest();
        console.log('user: ' + request.user);
        return super.canActivate(context);
      }
}