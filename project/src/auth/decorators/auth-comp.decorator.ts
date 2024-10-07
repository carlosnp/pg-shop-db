import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards';
import { UserRoles } from '../models';
import { RoleProtected } from './role-protected.decorator';

/**
 * Decorador compuesto de autorizacion
 * @param {..UserRoles[]}roles roles
 */
export function AuthComp(...roles: UserRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
