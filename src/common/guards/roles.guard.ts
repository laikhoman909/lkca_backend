import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from 'generated/prisma/client';

/**
 * Guard that checks if the user has the required roles to access a route
 * Works in conjunction with the @Roles() decorator
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from the @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(), // Check method-level decorator
      context.getClass(),   // Check class-level decorator
    ]);

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Get the user from the request (attached by JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // Check if user has at least one of the required roles
    return requiredRoles.some((role) => user.role === role);
  }
}