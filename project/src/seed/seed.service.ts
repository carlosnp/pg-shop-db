import { Injectable, Logger } from '@nestjs/common';
import { CreatedPayload, ProductsService } from '../products';
import { seedProducts } from './data';
import { DeleteResult } from 'typeorm';

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
  constructor(private readonly productsService: ProductsService) {}
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
   * Ejecuta el seed
   */
  async runSeed() {
    const productsSeed = this.runSeedProducts();
    return { products: productsSeed };
  }
  /**
   * Elimina la base de datos
   * @returns {Promise<boolean>}
   */
  async deleteProductsDB(): Promise<DeleteResult> {
    const remove = await this.productsService.removeAll();
    return remove;
  }
}
