import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { optionsCors } from './cors';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const prefix = 'api';
  const logger = new Logger('MAIN');
  const app = await NestFactory.create(AppModule);
  /** Habilitamos CORS y su configuracion */
  app.enableCors(optionsCors);
  /** Prefijo global */
  app.setGlobalPrefix(prefix);
  /** Con guración global de pipes */
  app.useGlobalPipes(
    // Validadores
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT);
  logger.log(`App running on PORT: ${process.env.PORT}`);
  logger.log(`App HOST: ${process.env.HOST_API}/${prefix}`);
}
bootstrap();
