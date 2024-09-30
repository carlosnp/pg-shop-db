import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserModelCreate } from '../models';
import { REGEX_PHONE_MESSAGE, REGEX_PHONE_VE } from '../helpers';
import { PasswordDto } from './password.dto';

export class CreateUserDto extends PasswordDto implements UserModelCreate {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(20)
  @Matches(REGEX_PHONE_VE, {
    message: REGEX_PHONE_MESSAGE,
  })
  @IsOptional()
  phone?: string;
}
