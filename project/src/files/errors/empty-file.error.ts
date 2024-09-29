import { FileValidator } from '@nestjs/common';

export class EmptyFileError extends FileValidator {
  constructor() {
    // parent class constructor requires any object as
    // argument, i think it is type mistake, so i pass
    // empty object
    super({ statusCode: 404 });
  }
  isValid(file?: unknown): boolean {
    return !!file;
  }
  buildErrorMessage(): string {
    return 'File is empty';
  }
}
