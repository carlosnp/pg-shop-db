import { Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { LOGGER_NAME } from '../constants';
import {
  EmptyFileException,
  InvalidFileTypeException,
} from '../provider-exceptions';

/**
 * Modelo del callback
 */
interface CallbackModel {
  (error: Error | null, filename: string): void;
}

/**
 * Crea el el nombre del archivo
 * @param {Express.Request} req
 * @param {Express.Multer.File} file
 * @param {CallbackModel} callback
 */
export const fileNameHelper = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: CallbackModel,
) => {
  const logger = new Logger(LOGGER_NAME);
  // console.log('ENTRO EN EL FILTRO', JSON.stringify(file, null, 2));
  if (!file) {
    const error = new EmptyFileException();
    logger.error(error);
    return callback(error, '');
  }
  /** Extension del archivo */
  const fileExt = file.mimetype.split('/')[1];
  if (!fileExt) {
    const error = new InvalidFileTypeException([]);
    logger.error(error);
    return callback(error, '');
  }
  const fileName = `${uuid()}.${fileExt}`;

  return callback(null, fileName);
};
