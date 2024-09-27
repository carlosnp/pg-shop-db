import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products';

@Injectable()
export class SeedService {
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
    return 'SEED';
  }
  /**
   * Elimina la base de datos
   * @returns {Promise<boolean>}
   */
  async deleteDB(): Promise<boolean> {
    const remove = await this.productsService.removeAll();
    console.log(remove);
    return true;
  }
}
