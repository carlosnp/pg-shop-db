import { IsEmail, IsString } from 'class-validator';
import { PasswordDto } from './password.dto';

export class LoginDto extends PasswordDto {
  @IsString()
  @IsEmail()
  email: string;
}
