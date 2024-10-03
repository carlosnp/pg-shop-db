import { IsString } from 'class-validator';

export class AddRoleDto {
  /**
   * Rol
   */
  @IsString()
  role: string;
}
