import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, retry } from 'rxjs';
import { ROLES_KEY } from './roles.decoration';
import { Role } from 'src/common/types/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const reqRole = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const user = context.getArgs().find((arg) => arg.user)?.user;
    let who = context.getArgs().find((arg) => arg.user)?.user.dept;

    if (who == `Information Technology`) {
      who = Role.ADMIN;
    } else {
      who = Role.USER;
    }

    if (!reqRole) {
      return true;
    }

    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    // Check if user has roles property
    if (!who) {
      throw new ForbiddenException('User has no roles assigned');
    }

    // Check if user has at least one of the required roles
    const hasRequiredRole = reqRole.some((role) => who.includes(role));

    if (!hasRequiredRole) {
      throw new ForbiddenException(`Access denied.`);
    }

    return true;
  }
}
