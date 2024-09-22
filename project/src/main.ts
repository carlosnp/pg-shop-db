import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { optionsCors } from './cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** Habilitamos CORS y su configuracion */
  app.enableCors(optionsCors);
  /** Prefijo global */
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
