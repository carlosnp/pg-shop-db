import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards';
import { ConfigAuthModel, UserRoles } from '../models';
import { RoleProtected } from './role-protected.decorator';
import { ConfigAuth } from './config-auth.decorator';

/**
 * Decorador compuesto de autorizacion
 * @param {..UserRoles[]}roles roles
 */
export function AuthComp(roles: UserRoles[], config?: ConfigAuthModel) {
  const newConfig: ConfigAuthModel = config ? config : { strictRole: false };
  return applyDecorators(
    RoleProtected(...roles),
    ConfigAuth(newConfig),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
