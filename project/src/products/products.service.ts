import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { createSlug } from './helpers';

@Injectable()
export class ProductsService {
  /**
   * Instancia para el registro de eventos
   */
  private readonly logger = new Logger('ProductsService');
  /**
   * Constructor
   * @param {Repository<Product>} productRepository Respositorio
   */
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  /**
   * Crear un producto
   * @param {CreateProductDto} createProductDto
   * @returns
   */
  async create(createProductDto: CreateProductDto) {
    try {
      /** Si no tiene un slug, lo creamos */
      if (!createProductDto.slug) {
        const slug = createSlug(createProductDto.title);
        this.logger.warn('Creamos el slug');
        createProductDto.slug = slug;
      }
      /** Creamos el producto */
      const product = this.productRepository.create(createProductDto);
      /** Guardamos el producto */
      const save = await this.productRepository.save(product);
      this.logger.verbose('Producto creado');
      return save;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  /**
   * Manejo de errores
   * @param {any} error Error
   */
  private handleDBExceptions(error: any) {
    // console.log(JSON.stringify(error, null, 2));
    /** Se imprim el error en el terminal */
    this.logger.error(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Unexpected error! save me!!!');
  }
}
