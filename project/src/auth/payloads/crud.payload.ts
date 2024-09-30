import { CrudResponse, SearchResult } from 'src/pg-shop';
import { User } from '../entities';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

/**
 * Errors
 */
type CrudError = BadRequestException | InternalServerErrorException;
/**
 * Encontrar usuario
 */
type FindUserError = NotFoundException;
export type FindUserPayload = CrudResponse<User, FindUserError>;
/**
 * Paylaod para las listas
 */
export type ListUserPayload = SearchResult<User>;
/**
 * Payload para crear
 */
type CreatedError = CrudError;
export type CreatedUserPayload = CrudResponse<User, CreatedError>;
/**
 * Payload para actualizar
 */
type UpdatedError = CrudError | NotFoundException;
export type UpdatedUserPayload = CrudResponse<User, UpdatedError>;
/**
 * Payload para eliminar
 */
type DeletedError = NotFoundException;
export type DeletedUserPayload = CrudResponse<User, DeletedError>;
