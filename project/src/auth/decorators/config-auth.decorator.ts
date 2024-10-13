import { SetMetadata } from '@nestjs/common';
import { ConfigAuthModel } from '../models';

export const META_CONFIG = 'config';

export const ConfigAuth = (args: ConfigAuthModel) => {
  return SetMetadata(META_CONFIG, args);
};
