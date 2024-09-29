import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { UNSUPPORTED_MEDIA_TYPE_MESSAGE } from './constants.exception';
import { EmptyFileException } from './empty-file.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    // Verificar si la excepción es un error de archivo vacío
    if (exception instanceof EmptyFileException) {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.message,
        error: 'Empty file',
      });
    }
    if (exception.message === UNSUPPORTED_MEDIA_TYPE_MESSAGE) {
      // Verificar si la excepción es un error de tipo de archivo inválido
      console.log('llego aqui');
      response.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).json({
        statusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        message: exception.message,
        error: 'Invalid file type',
        curro: 'perro',
      });
    }
    console.error(exception);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
