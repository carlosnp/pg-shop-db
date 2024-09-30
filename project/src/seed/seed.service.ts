import { Injectable, Logger } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreatedPayload, ProductsService } from '../products';
import { AuthService, CreatedUserPayload } from '../auth';
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
    await this.deleteProductsDB();
    const products = [...seedProducts];

    const insertP: Promise<CreatedPayload>[] = [];
    products.forEach((product) => {
      const promise: Promise<CreatedPayload> =
        this.productsService.create(product);
      insertP.push(promise);
    });
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
    /** Elimiar los usuarios */
    await this.authService.removeAll();
    const users = [...usersSeed];

    const insertP: Promise<CreatedUserPayload>[] = [];
    users.forEach((user) => {
      const promise: Promise<CreatedUserPayload> =
        this.authService.create(user);
      insertP.push(promise);
    });
    const result = await Promise.all(insertP);
    const entities = result.map((item) => item.entity);
    const errors = result.filter((item) => !!item.error);
    this.logger.log('Finalizo la carga de usuarios');
    return { entities, errors };
  }
  /**
   * Ejecuta el seed
   */
  async runSeed() {
    const productsSeed = this.runSeedProducts();
    const usersSeed = this.runSeedUsers();
    this.logger.log('FINALIZO EL SEMILLERO');
    return { productsSeed, usersSeed };
  }
  /**
   * Elimina los productos
   * @returns {Promise<DeleteResult>}
   */
  async deleteProductsDB(): Promise<DeleteResult> {
    const remove = await this.productsService.removeAll();
    return remove;
  }
}
