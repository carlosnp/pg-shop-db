import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { fileImageFilterHelper } from './file-image-filter.helper';
import { diskStorage } from 'multer';
import { fileNameHelper } from './file-name.helper';
import { DIR_IMAGES } from './constants.helper';

/**
 * Opciones del multer
 */
export const fileImageMulter: MulterOptions = {
  fileFilter: fileImageFilterHelper,
  storage: diskStorage({
    destination: `./${DIR_IMAGES}`,
    filename: fileNameHelper,
  }),
};
