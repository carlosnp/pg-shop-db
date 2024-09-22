import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { optionsCors } from './cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** Habilitamos CORS y su configuracion */
  app.enableCors(optionsCors);
  /** Prefijo global */
  app.setGlobalPrefix('api');
  /** Con guración global de pipes */
  app.useGlobalPipes(
    // Validadores
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
