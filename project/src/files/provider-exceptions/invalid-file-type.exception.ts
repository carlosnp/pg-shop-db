import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/pg-shop';
import { UNSUPPORTED_MEDIA_TYPE_MESSAGE } from './constants.exception';

/** Status */
const status = HttpStatus.UNSUPPORTED_MEDIA_TYPE;
/** Mensaje */
const message = UNSUPPORTED_MEDIA_TYPE_MESSAGE;
/** Error */
const localError = (expected: string[]) =>
  new BaseError(message, status, { expectedFileType: expected });

export class InvalidFileTypeException extends HttpException {
  /**
   * Constructor
   * @param {string[]} expected Tipos de archivo esperado
   */
  constructor(expected: string[]) {
    super(localError(expected), status);
  }
}
