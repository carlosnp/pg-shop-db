import { Injectable, Logger } from '@nestjs/common';
import { CreatedPayload, ProductsService } from '../products';
import { AuthService, User } from '../auth';
import { seedProducts, usersSeed } from './data';

@Injectable()
export class SeedService {
  /**
   * Instancia para el registro de eventos
   */
  private readonly logger = new Logger('Seed');
  /**
   * Constructor
   * @param productsService Servicio de productos
   */
  constructor(
    private readonly productsService: ProductsService,
    private readonly authService: AuthService,
  ) {}
  /**
   * Semilla de productos
   * @returns
   */
  private async runSeedProducts(user: User) {
    const products = [...seedProducts];
    const resutl = await this.productsService.createMany(products, user);
    this.logger.log('Finalizo la carga de productos');
    return resutl;
  }
  /**
   * Semilla de usuarios
   */
  private async runSeedUsers() {
    const users = [...usersSeed];
    const result = await this.authService.createManyValidate(users);
    this.logger.log('Finalizo la carga de usuarios');
    return result;
  }
  /**
   * Elimina la base de datos en orden
   */
  private async deleteTables() {
    const result = await Promise.all([
      await this.productsService.removeAll(),
      await this.authService.removeAll(),
    ]);
    return result;
  }
  /**
   * Ejecuta el seed
   */
  async runSeed() {
    await this.deleteTables();
    const usersSeed = await this.runSeedUsers();
    const firstUser = usersSeed[0];
    const productsSeed = this.runSeedProducts(firstUser);
    this.logger.log('FINALIZO EL SEMILLERO');
    return { users: usersSeed, products: productsSeed };
  }
}
