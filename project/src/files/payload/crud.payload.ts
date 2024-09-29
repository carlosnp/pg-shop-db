import { CrudResponse } from 'src/pg-shop';
import {
  EmptyFileException,
  InvalidFileTypeException,
} from '../provider-exceptions';

/**
 * Payload para subir imagen
 */
export type UploadImageError = EmptyFileException | InvalidFileTypeException;
export type UploadImagePayload = CrudResponse<string, UploadImageError>;
