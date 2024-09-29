import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FilesService } from './files.service';
import { fileImageMulter } from './helpers';

@Controller('files')
export class FilesController {
  /**
   * Constructor
   * @param {FilesService} filesService Servicio
   */
  constructor(private readonly filesService: FilesService) {}
  /**
   * Obtiene la imagen
   * @param {Response} res respuesta
   * @param {string} imageName Nombre de la imagen
   */
  @Get('image/:imageName')
  findImage(@Res() res: Response, @Param('imageName') imageName: string) {
    this.filesService.getStaticImage(res, imageName);
  }
  /**
   * Subir una imagen
   * @param {Request} req Solicitud
   * @param {Express.Multer.File} file Archivo
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', fileImageMulter))
  uploadImage(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadImageFile(req, file);
  }
}
