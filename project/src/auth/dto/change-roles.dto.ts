import { IsArray, IsEnum } from 'class-validator';
import { AllUserRoles, UserRoles } from '../models';

export class ChangeRolesDto {
  /**
   * Roles
   */
  @IsEnum(AllUserRoles, {
    each: true,
    message: `roles must be one or more of the following values: ${AllUserRoles}`,
  })
  @IsArray()
  roles: UserRoles[];
}
