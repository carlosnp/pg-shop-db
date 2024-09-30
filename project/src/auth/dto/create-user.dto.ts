import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserModelCreate } from '../models';
import {
  REGEX_PASSWORD,
  REGEX_PASSWORD_MESSAGE,
  REGEX_PHONE_MESSAGE,
  REGEX_PHONE_VE,
} from '../helpers';

export class CreateUserDto implements UserModelCreate {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(20)
  @Matches(REGEX_PHONE_VE, {
    message: REGEX_PHONE_MESSAGE,
  })
  @IsOptional()
  phone?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(10)
  @Matches(REGEX_PASSWORD, {
    message: REGEX_PASSWORD_MESSAGE,
  })
  password: string;
}
