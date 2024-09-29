import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AllExceptionsFilter } from './provider-exceptions';

@Module({
  controllers: [FilesController],
  providers: [FilesService, AllExceptionsFilter],
})
export class FilesModule {}
