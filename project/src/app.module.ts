import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PgShopModule } from './pg-shop/pg-shop.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.default'],
      isGlobal: true,
    }),
    PgShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
