import { User } from '../entities';

/**
 * Obtiene el fullname de un usuario
 * @param {User} user usuario
 * @returns {string}
 */
export const getFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};
