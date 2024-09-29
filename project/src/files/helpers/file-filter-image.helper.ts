import { Logger } from '@nestjs/common';
import { IMAGE_MIME_TYPES, LOGGER_NAME } from '../constants';
import {
  EmptyFileException,
  InvalidFileTypeException,
} from '../provider-exceptions';

/**
 * Modelo del callback
 */
interface CallbackModel {
  (error: Error | null, acceptFile: boolean): void;
}

/**
 * Filtro para archivos de imagenes
 * @param {Express.Request} req
 * @param {Express.Multer.File} file
 * @param {CallbackModel} callback
 */
export const fileImageFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: CallbackModel,
) => {
  const logger = new Logger(LOGGER_NAME);
  console.log('ENTRO EN EL FILTRO', JSON.stringify(file, null, 2));
  if (!file) {
    const error = new EmptyFileException();
    logger.error(error);
    return callback(error, false);
  }
  if (!IMAGE_MIME_TYPES.includes(file.mimetype.toLowerCase())) {
    const error = new InvalidFileTypeException(IMAGE_MIME_TYPES);
    logger.error(error);
    return callback(error, false);
  }
  return callback(null, true);
};
