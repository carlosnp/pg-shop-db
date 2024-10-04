import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { REGEX_PASSWORD, REGEX_PASSWORD_MESSAGE } from '../helpers';

export class ChangePasswordDto {
  /**
   * Actual contraseña
   */
  @IsString()
  @MinLength(6)
  @MaxLength(10)
  @Matches(REGEX_PASSWORD, {
    message: REGEX_PASSWORD_MESSAGE,
  })
  current: string;
  /**
   * Nueva contraseña
   */
  @IsString()
  @MinLength(6)
  @MaxLength(10)
  @Matches(REGEX_PASSWORD, {
    message: REGEX_PASSWORD_MESSAGE,
  })
  new: string;
}
