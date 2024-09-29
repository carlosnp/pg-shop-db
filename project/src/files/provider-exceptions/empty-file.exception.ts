import { HttpException, HttpStatus } from '@nestjs/common';
import { EMPTY_FILE_MESSAGE } from './constants.exception';
import { BaseError } from 'src/pg-shop';

/** Status */
const status = HttpStatus.BAD_REQUEST;
/** Mensaje */
const message = EMPTY_FILE_MESSAGE;
/** Error */
const localError = () => new BaseError(message, status);

/**
 * Archivo vacio
 */
export class EmptyFileException extends HttpException {
  constructor() {
    super(localError(), status);
  }
}
