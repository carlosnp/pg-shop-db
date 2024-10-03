import { IsArray, IsString } from 'class-validator';

export class ChangeRolesDto {
  /**
   * Roles
   */
  @IsString({ each: true })
  @IsArray()
  roles: string[];
}
