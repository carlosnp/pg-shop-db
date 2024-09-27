import { CrudResponse, SearchResult } from 'src/pg-shop';
import { Product } from '../entities';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

/**
 * Errors
 */
export type CrudError = BadRequestException | InternalServerErrorException;

/**
 * Paylaod para las listas
 */
export type ListPayload = SearchResult<Product>;
/**
 * Payload para crear
 */
export type CreatedError = CrudError;
export type CreatedPayload = CrudResponse<Product, CreatedError>;
/**
 * Payload para actualizar
 */
export type UpdatedError = CrudError | NotFoundException;
export type UpdatedPayload = CrudResponse<Product, UpdatedError>;

/**
 * Payload para eliminar
 */
export type DeletedError = NotFoundException;
export type DeletedPayload = CrudResponse<Product, DeletedError>;
