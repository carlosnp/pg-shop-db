import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUuid } from 'uuid';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { PaginationDto } from 'src/common';

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
   * @returns {Promise<Product>} Producto
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
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
  /**
   * Lista de productos
   * @returns {Promise<Product[]>} Lista
   */
  getAll(): Promise<Product[]> {
    const list = this.productRepository.find({});
    this.logger.verbose('Productos listados');
    return list;
  }
  /**
   * Lista paginada
   * @param {PaginationDto} pagDto Paginacion
   * @returns {Promise<Product[]>}
   */
  getAllPagination(pagDto: PaginationDto): Promise<Product[]> {
    const { limit = 10, offset = 0 } = pagDto;
    const list = this.productRepository.find({
      take: limit,
      skip: offset,
    });
    this.logger.verbose('Productos paginados');
    return list;
  }
  findAll() {
    return `This action returns all products`;
  }
  /**
   * Encontrar producto por su id
   * @param {string} id Id del producto
   * @returns {Promise<Product>}
   */
  async findById(id: string): Promise<Product> {
    const find = await this.productRepository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.logger.verbose('Producto encontrado');
    return find;
  }
  /**
   * Buscar por Id o por slug
   * @param term termino
   * @returns {Promise<Product>}
   */
  async findByTerm(term: string): Promise<Product> {
    console.log('\n term SERVICE', term, '\n');
    let find: Product;
    if (!term) {
      throw new BadRequestException(`Invalid term ${term}`);
    }
    if (isUuid(term)) {
      find = await this.productRepository.findOneBy({ id: term });
    } else {
      find = await this.productRepository.findOneBy({ slug: term });
    }
    if (!find) {
      throw new NotFoundException(
        `Product with term ->> ${term} <-- not found`,
      );
    }
    this.logger.verbose('Producto encontrado');
    return find;
  }
  /**
   * Encontrar usando queryuilder
   * @param term termino
   * @returns {Promise<Product>}
   */
  async findByQuery(term: string): Promise<Product> {
    let find: Product;
    if (!term) {
      throw new BadRequestException(`Invalid term ${term}`);
    }
    if (isUuid(term)) {
      find = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      find = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLocaleLowerCase(),
        })
        .getOne();
    }
    if (!find) {
      throw new NotFoundException(
        `Product with term ->> ${term} <-- not found`,
      );
    }
    this.logger.verbose('Producto encontrado');
    return find;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }
  /**
   * Eliminar un producto
   * @param {string} id Id del producto
   * @returns {Promise<Product>}
   */
  async remove(id: string): Promise<Product> {
    const find = await this.findById(id);
    const result = await this.productRepository.remove(find);
    return result;
  }
  /**
   * Manejo de errores
   * @param {any} error Error
   */
  private handleDBExceptions(error: any) {
    // console.log(
    //   '\n INIT-----------',
    //   JSON.stringify(error, null, 2),
    //   '\n -----------END',
    // );
    /** Se imprim el error en el terminal */
    this.logger.error(error);
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    if (error.criteria) {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException('Unexpected error! save me!!!');
  }
}
