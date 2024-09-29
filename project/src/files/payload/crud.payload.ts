import { CrudResponse } from 'src/pg-shop';
import {
  EmptyFileException,
  InvalidFileTypeException,
} from '../provider-exceptions';
import { BadRequestException } from '@nestjs/common';

/**
 * Payload para subir imagen
 */
export type UploadImageError =
  | EmptyFileException
  | InvalidFileTypeException
  | BadRequestException;
export type UploadImagePayload = CrudResponse<string, UploadImageError>;
