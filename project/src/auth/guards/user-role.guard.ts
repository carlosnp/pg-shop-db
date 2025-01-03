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
import { META_CONFIG, META_ROLES } from '../decorators';
import { ConfigAuthModel } from '../models';

/**
 * Verifica si una lista de strings contiene a otra
 * @param {string[]} list Lista
 * @param {string[]} valids Lista valida
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const includesAll = (list: string[], valids: string[]): boolean => {
  return valids.every((item) => list.includes(item));
};
/**
 * Verifica si una lista de strings contiene a uno o varios elementos de otra lista
 * @param {string[]} list Lista
 * @param {string[]} valids Lista valida
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const containsAny = (list: string[], valids: string[]): boolean => {
  return list.some((item) => valids.includes(item));
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
      META_ROLES,
      context.getHandler(),
    );
    const config: ConfigAuthModel = this.reflector.get(
      META_CONFIG,
      context.getHandler(),
    );
    /** Verificar Si se especifican roles */
    if (!validRoles || validRoles.length === 0) {
      this.logger.log('Approved user');
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    /** Verificar si existe el usuario */
    if (!user) {
      const error = new InternalServerErrorException('User not found (guard)');
      this.logger.error(error);
      throw error;
    }
    const condition = config.strictRole
      ? includesAll(user.roles, validRoles)
      : containsAny(user.roles, validRoles);
    /** Verificar si los roles del usuario son validos */
    if (!condition) {
      const error = new ForbiddenException(
        `User >>${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}<< need a valid roles: [${validRoles}]`,
      );
      this.logger.error(error);
      throw error;
    }
    if (condition) {
      this.logger.log('Approved user');
    } else {
      this.logger.log('Unapproved user');
    }
    return condition;
  }
}
