import { Module } from '@nestjs/common';
import { ProductsModule } from '../products';
import { AuthModule } from '../auth';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductsModule, AuthModule],
})
export class SeedModule {}
