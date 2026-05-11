import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'generated/prisma/client';

/**
 * Decorator to specify required roles for accessing a route
 * Usage: @Roles(UserRole.ADMIN)
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);