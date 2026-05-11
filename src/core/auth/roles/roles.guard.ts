import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from 'src/common/types/enums/role.enum';

/**
 * Guard that checks if the user has the required roles to access a route
 * Works in conjunction with the @Roles() decorator
 */
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     // Get the required roles from the @Roles() decorator
//     const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
//       context.getHandler(), // Check method-level decorator
//       context.getClass(),   // Check class-level decorator
//     ]);

//     // If no roles are required, allow access
//     if (!requiredRoles || requiredRoles.length === 0) {
//       return true;
//     }

//     // Get the user from the request (attached by JwtAuthGuard)
//     const { user } = context.switchToHttp().getRequest();

//     // Check if user has at least one of the required roles
//     return requiredRoles.some((role) => user.role === role);
//   }
// }

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
