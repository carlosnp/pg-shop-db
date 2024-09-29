import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { fileImageFilterHelper } from './file-image-filter.helper';
import { diskStorage } from 'multer';
import { fileNameHelper } from './file-name.helper';

const DESTINATION = 'static/images';
/**
 * Opciones del multer
 */
export const fileImageMulter: MulterOptions = {
  fileFilter: fileImageFilterHelper,
  storage: diskStorage({
    destination: `./${DESTINATION}`,
    filename: fileNameHelper,
  }),
};
