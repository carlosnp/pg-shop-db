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
   * Ejecuta el seed
   */
  async runSeed() {
    await this.deleteDB();
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
    this.logger.log('Finalizo la carga de la base de datos');
    return { entities, errors };
  }
  /**
   * Elimina la base de datos
   * @returns {Promise<boolean>}
   */
  async deleteDB(): Promise<DeleteResult> {
    const remove = await this.productsService.removeAll();
    return remove;
  }
}
