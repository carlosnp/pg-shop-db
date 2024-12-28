import { User } from '../entities';
import { getFullName } from '../helpers';

export class UserResponseDto {
  id: string;
  fullName: string;
  token?: string;
  /**
   * Constructor
   * @param {User} user usuario
   */
  constructor(user: User, token?: string) {
    this.id = user.id;
    this.fullName = getFullName(user);
    this.token = token;
  }
}
