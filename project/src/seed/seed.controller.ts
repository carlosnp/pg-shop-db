import { Controller, Get } from '@nestjs/common';
import { AuthComp, UserRoles } from '../auth';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  /**
   * Ejecuta el seed
   */
  @Get()
  @AuthComp([UserRoles.ROOT], {})
  runSeedSecure() {
    return this.seedService.runSeed();
  }
}
