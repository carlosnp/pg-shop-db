import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { EmptyFileException } from './provider-exceptions';
import { LOGGER_NAME } from './constants';
import { UploadImagePayload } from './payload';

@Injectable()
export class FilesService {
  /**
   * Instancia para el registro de eventos
   */
  private readonly logger = new Logger(LOGGER_NAME);
  /**
   * Obtiene la url completa
   * @param {Request} req Solicitud
   * @returns {string}
   */
  private getfullUrl(req: Request): string {
    return `${req.protocol}://${req.get('Host')}${req.originalUrl}`;
  }
  /**
   * Obtiene la metadata de una solicitud
   * @param {Request} req Solicitud
   * @returns {string}
   */
  private getMetadata(req: Request): string {
    return req.body && req.body['metadata']
      ? (req.body['metadata'] as string)
      : '';
  }
  /**
   * Sube una archivo de imagen
   * @param {Request} req Solicitud
   * @param {Express.Multer.File} file Archivo
   * @returns
   */
  public uploadImageFile(
    req: Request,
    file: Express.Multer.File,
  ): UploadImagePayload {
    // const fullUrl = this.getfullUrl(req);
    // const metadata = this.getMetadata(req);
    // console.log('\n fullUrl', fullUrl);
    // console.log('\n metadata', metadata);
    if (!file) {
      const error = new EmptyFileException();
      this.logger.error(error);
      return { error };
    }
    const secureUrl = `${file.filename}`;
    return { entity: secureUrl };
  }
}
