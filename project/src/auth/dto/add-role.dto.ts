import { IsEnum } from 'class-validator';
import { AllUserRoles, UserRoles } from '../models';

export class AddRoleDto {
  /**
   * Rol
   */
  @IsEnum(AllUserRoles, {
    message: `role must be one of the following values: ${AllUserRoles}`,
  })
  role: UserRoles;
}
