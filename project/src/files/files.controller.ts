import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { FilesService } from './files.service';
import { fileImageMulter } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
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
