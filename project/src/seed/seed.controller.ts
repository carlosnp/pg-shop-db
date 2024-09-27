import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  /**
   * Ejecuta el seed
   */
  @Get()
  runSeed() {
    return this.seedService.runSeed();
  }
  /**
   * Limpiar DB
   */
  @Get('clean')
  cleanDB() {
    return this.seedService.deleteDB();
  }
}
