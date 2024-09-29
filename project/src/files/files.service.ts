import { Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { EmptyFileException } from './provider-exceptions';
import { LOGGER_NAME } from './constants';
import { UploadImagePayload } from './payload';
import { join } from 'path';
import { DIR_IMAGES } from './helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  /**
   * constructor
   * @param {ConfigService} configService
   */
  constructor(private readonly configService: ConfigService) {}
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
   * Encuentra la ruta completa del archivo
   * @param {string} fileName Nombre del archivo
   * @param {string} dir_file Directorio en donde se encuentra el archvio
   * @returns {string} Ruta completa del archivo
   */
  private getPathFile(fileName: string, dir_file: string): string {
    /** Ruta del archivo local */
    const path = join(__dirname, `../../${dir_file}`, fileName);
    this.logger.verbose(`Encontamos la imagen en ${path}`);
    return path;
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
    if (!file) {
      const error = new EmptyFileException();
      this.logger.error(error);
      return { error };
    }
    const fullUrl = this.getfullUrl(req).replace('upload', 'image');
    const secureUrl = `${fullUrl}/${file.filename}`;
    return { entity: secureUrl };
  }
  /**
   * Obtiene el path de una imagen statica
   * @param {string} imageName Nombre de la imagen
   */
  public getStaticImage(res: Response, imageName: string) {
    /** Ruta del archivo local */
    const localPath = this.getPathFile(imageName, DIR_IMAGES);
    this.logger.log(`Local path image: ${localPath}`);
    res.sendFile(localPath, {}, function (err: Error) {
      if (err) {
        res
          .status(404)
          .json({
            status: 404,
            message: 'No se encontro la imagen',
            imageName: imageName,
            name: 'NotFound',
          })
          .end();
      }
    });
  }
}
