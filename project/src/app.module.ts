import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PgShopModule } from './pg-shop';
import { ProductsModule } from './products';
import { SeedModule } from './seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.default'],
      isGlobal: true,
    }),
    PgShopModule,
    ProductsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
