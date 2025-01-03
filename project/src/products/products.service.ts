import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, ILike, Repository } from 'typeorm';
import { validate as isUuid } from 'uuid';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product, ProductImage } from './entities';
import {
  buildComparator,
  ComparisonOperator,
  PaginationDto,
} from 'src/pg-shop';
import {
  CreatedPayload,
  DeletedPayload,
  ListPayload,
  UpdatedPayload,
} from './payloads';
import { User } from 'src/auth';

@Injectable()
export class ProductsService {
  /**
   * Instancia para el registro de eventos
   */
  private readonly logger = new Logger('ProductsService');
  /**
   * Constructor
   * @param {Repository<Product>} productRepository Respositorio de productos
   * @param {Repository<ProductImage>} productImageRepository Respositorio de imagenes
   * @param {DataSource} dataSource Fuente de base de datos
   */
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
  ) {}
  /**
   * Mapear entidad producto
   * @param {Product} item Producto
   */
  private productMap(item: Product) {
    return {
      ...item,
      images: item.images.map((img) => img.url),
    };
  }
  /**
   * Lista de productos mapeados
   * @param {Product[]} list  Lista
   */
  private productsMap(list: Product[]) {
    return list.map((item) => this.productMap(item));
  }
  /**
   * Lista de productos
   * @returns {Promise<Product[]>} Lista
   */
  async getAll(): Promise<ListPayload> {
    const list = await this.productRepository.find();
    const total = list.length;
    const result: ListPayload = { total, list };
    this.logger.log('Productos listados');
    return result;
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
    this.logger.log('Productos paginados');
    return list;
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
    this.logger.log('Producto encontrado');
    return find;
  }
  /**
   * Buscar por Id o por slug
   * @param term termino
   * @returns {Promise<Product>}
   */
  async findByTerm(term: string): Promise<Product> {
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
    this.logger.log('Producto encontrado');
    return find;
  }
  /**
   * Lista todos por titulo
   * @param title Titulo
   * @returns {Promise<ListPayload>}
   */
  async findByTitle(name: string): Promise<ListPayload> {
    const list = await this.productRepository.find({
      where: { name: ILike(`%${name.toLowerCase()}%`) },
    });
    const total = list.length;
    const result: ListPayload = { total, list };
    return result;
  }
  /**
   * Encuentra productos por precio
   * @param {number} price precio
   * @param {ComparisonOperator} operator operador
   * @returns {Promise<ListPayload>} Lista de prodcutos
   */
  async findProductsByPrice(
    price: number,
    operator: ComparisonOperator,
  ): Promise<ListPayload> {
    const whereCondition = buildComparator(price, operator, 'price');
    const list = await this.productRepository.find({
      where: { ...whereCondition },
    });
    const total = list.length;
    const result: ListPayload = { total, list };
    return result;
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
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      find = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          name: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('product.images', 'images')
        .getOne();
      // console.log('Query executed:', queryBuilder.getSql());
    }
    if (!find) {
      throw new NotFoundException(
        `Product with term ->> ${term} <-- not found`,
      );
    }
    this.logger.log('Producto encontrado');
    return find;
  }
  /**
   * Prepara el producto para crearlo en base de datos
   * @param {CreateProductDto} createProductDto
   * @param {User} user Usuario
   * @returns {Product}
   */
  private prepareToCreate(input: CreateProductDto, user: User): Product {
    const { images = [], ...productProps } = input;
    /** Creamos el producto */
    const build = this.productRepository.create({
      ...productProps,
      user: user,
      images: images.map((img) =>
        this.productImageRepository.create({ url: img }),
      ),
    });
    return build;
  }
  /**
   * Crear un producto
   * @param {input} createProductDto
   * @param {User} user Usuario
   * @returns {Promise<Product>} Producto
   */
  async create(input: CreateProductDto, user: User): Promise<CreatedPayload> {
    try {
      /** Creamos el producto */
      const product = this.prepareToCreate(input, user);
      /** Guardamos el producto */
      const result = await this.productRepository.save(product);
      this.logger.verbose('Producto creado');
      return { id: result.id, entity: result };
    } catch (error) {
      const handlerError = this.handleDBExceptions(error);
      return { error: handlerError };
    }
  }
  /**
   * Crea muchos productos
   * @param {CreateProductDto[]} input Lista de productos
   * @param {User} user Usuario
   */
  async createMany(input: CreateProductDto[], user: User) {
    const seed = [...input];
    const insertP: Promise<CreatedPayload>[] = [];
    seed.forEach((item) => {
      const promise: Promise<CreatedPayload> = this.create(item, user);
      insertP.push(promise);
    });
    const result = await Promise.all(insertP);
    const entities = result.map((item) => item.entity).filter((item) => !!item);
    const errors = result.map((item) => item.error).filter((item) => !!item);
    return { entities, errors };
  }
  /**
   * Actualizar un producto
   * @param {string} id Id del producto
   * @param {UpdateProductDto} updateProductDto Data a actualizar
   * @param {User} user Usuario
   * @returns {Promise<Product>} Producto actualizado
   */
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    user: User,
  ): Promise<UpdatedPayload> {
    const { images, ...productProps } = updateProductDto;
    /** Preparamos para la actualizacion */
    const find = await this.productRepository.preload({ id, ...productProps });
    /** Verificamos que exista */
    if (!find) {
      const error = new NotFoundException(`Product with ID ${id} not found`);
      return { error: error };
    }
    /** Creamos el queryRunner */
    const queryRunner = this.dataSource.createQueryRunner();
    /** Conectamos a la base de datos */
    await queryRunner.connect();
    /** inicializamos la transaccion */
    await queryRunner.startTransaction();
    /** Guardamos */
    try {
      /** Si tiene imagenes */
      if (images) {
        /** Eliminamos las imagenes actuales del producto */
        await queryRunner.manager.delete(ProductImage, { product: { id } });
        find.images = images.map((img) =>
          this.productImageRepository.create({ url: img }),
        );
      } else {
        /** Buscamos las imagenes del producto y las insertamos */
        const oldImages = await this.productImageRepository.findBy({
          product: { id },
        });
        find.images = oldImages;
      }
      find.user = user;
      const result = await queryRunner.manager.save(find);
      await queryRunner.commitTransaction();
      /** Libera el query runner */
      await queryRunner.release();
      this.logger.log('Producto actualizado');
      return { id: result.id, entity: result };
    } catch (error) {
      /** Regresamos los cambios */
      await queryRunner.rollbackTransaction();
      /** Libera el query runner */
      await queryRunner.release();
      const handlerError = this.handleDBExceptions(error);
      return { error: handlerError };
    }
  }
  /**
   * Eliminar un producto
   * @param {string} id Id del producto
   * @returns {Promise<DeletedPayload>}
   */
  async remove(id: string): Promise<DeletedPayload> {
    const find = await this.findById(id);
    const result = await this.productRepository.remove(find);
    this.logger.log('Producto eliminado');
    return result;
  }
  /**
   * Eliminar todos los productos
   * @returns {Promise<DeleteResult>}
   */
  async removeAll(): Promise<DeleteResult> {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      const remove = await query.delete().where({}).execute();
      return remove;
    } catch (error) {
      this.handleDBExceptions(error);
    }
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
      return new BadRequestException(error.detail);
    }
    if (error.criteria) {
      return new BadRequestException(error.message);
    }
    return new InternalServerErrorException('Unexpected error! save me!!!');
  }
}
