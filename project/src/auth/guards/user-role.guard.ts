import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities';

/**
 * Verifica si una lista de strings contiene a otra
 * @param {string[]} list Lista
 * @param {string[]} valids Lista valida
 * @returns {boolean}
 */
const includesAll = (list: string[], valids: string[]): boolean => {
  return valids.every((item) => list.includes(item));
};

@Injectable()
export class UserRoleGuard implements CanActivate {
  logger = new Logger('UserRoleGuard');
  /**
   * Cosntructor
   * @param {Reflector} reflector
   */
  constructor(private readonly reflector: Reflector) {}
  /**
   * Activar
   * @param {ExecutionContext} context Contexto
   * @returns {boolean}
   */
  canActivate(context: ExecutionContext): boolean {
    const validRoles: string[] = this.reflector.get(
      'roles',
      context.getHandler(),
    );
    /** Verificar Si se especifican roles */
    if (!validRoles || validRoles.length === 0) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    /** Verificar si existe el usuario */
    if (!user) {
      throw new InternalServerErrorException('User not found (guard)');
    }
    const condition = includesAll(user.roles, validRoles);
    /** Verificar si los roles del usuario son validos */
    if (!condition) {
      const error = new ForbiddenException(
        `User >>${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}<< need a valid roles: [${validRoles}]`,
      );
      this.logger.error(error);
      throw error;
    }
    return condition;
  }
}
