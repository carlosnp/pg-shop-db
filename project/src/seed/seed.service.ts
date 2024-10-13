import { Injectable, Logger } from '@nestjs/common';
import { CreatedPayload, ProductsService } from '../products';
import { AuthService } from '../auth';
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
  private async runSeedProducts() {
    const products = [...seedProducts];

    const insertP: Promise<CreatedPayload>[] = [];
    // products.forEach((product) => {
    //   const promise: Promise<CreatedPayload> =
    //     this.productsService.create(product);
    //   insertP.push(promise);
    // });
    const result = await Promise.all(insertP);
    const entities = result.map((item) => item.entity);
    const errors = result.filter((item) => !!item.error);
    this.logger.log('Finalizo la carga de Productos');
    return { entities, errors };
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
   * Ejecuta el seed
   */
  async runSeed() {
    await this.deleteTables();
    const usersSeed = await this.runSeedUsers();
    // const productsSeed = this.runSeedProducts();
    this.logger.log('FINALIZO EL SEMILLERO');
    return { usersSeed };
  }
  /**
   * Elimina la base de datos en orden
   */
  async deleteTables() {
    const result = await Promise.all([
      await this.productsService.removeAll(),
      await this.authService.removeAll(),
    ]);
    return result;
  }
}
