import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../models';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: UserRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
