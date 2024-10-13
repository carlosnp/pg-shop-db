import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { AuthComp, GetCustomUser, User, UserRoles } from '../auth';
import { ComparisonOperator, PaginationDto } from '../pg-shop';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import {
  CreatedPayload,
  DeletedPayload,
  ListPayload,
  UpdatedPayload,
} from './payloads';

const CREATE_UPDATE_ROLES: UserRoles[] = [
  UserRoles.ROOT,
  UserRoles.ADMIN,
  UserRoles.DEVELOPER,
  UserRoles.CONTRIBUTOR,
];

@Controller('products')
export class ProductsController {
  /**
   * Constructor del controlador
   * @param {ProductsService} productsService Servicio
   */
  constructor(private readonly productsService: ProductsService) {}
  /**
   * Lista de productos
   * @returns {Promise<ListPayload>}
   */
  @Get()
  getAll(): Promise<ListPayload> {
    return this.productsService.getAll();
  }
  /**
   * Lista paginada
   * @param {PaginationDto} pagDto Paginacion
   * @returns {Promise<Product[]>}
   */
  @Get('/pag')
  getAllPagination(@Query() pagDto: PaginationDto): Promise<Product[]> {
    return this.productsService.getAllPagination(pagDto);
  }
  /**
   * Encontrar por titulo
   * @param {string} title Titulo
   * @returns {Promise<ListPayload>}
   */
  @Get('by-title')
  findBytitle(@Query('name') name: string): Promise<ListPayload> {
    const products = this.productsService.findByTitle(name);
    return products;
  }
  /**
   * Obtener productos por precio
   * @param {number} price Precio
   * @param {ComparisonOperator} operator Operador
   * @returns {Promise<ListPayload>}
   */
  @Get('by-price')
  findByPrice(
    @Query('price') price: number,
    @Query('operator') operator: ComparisonOperator,
  ): Promise<ListPayload> {
    const products = this.productsService.findProductsByPrice(price, operator);
    return products;
  }
  /**
   * Encontrar por Id
   * @param {string} id Id
   * @returns {Promise<Product>}
   */
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.findById(id);
  }
  /**
   * Encontrar por termino
   * @param {string} id Termino: Uuid, slug
   * @returns {Promise<Product>}
   */
  @Get('/term/:id')
  findByTerm(@Param('id') id: string): Promise<Product> {
    return this.productsService.findByTerm(id);
  }
  /**
   * Encontrar usando un texto
   * @param {string} id texto: Uuid, slug, titulo
   * @returns {Promise<Product>}
   */
  @Get('/text/:id')
  findByQuery(@Param('id') id: string): Promise<Product> {
    return this.productsService.findByQuery(id);
  }
  /**
   * Crear un producto
   * @param { CreateProductDto } createProductDto
   * @returns { Promise<CreatedPayload> } Producto
   */
  @Post()
  @AuthComp(CREATE_UPDATE_ROLES, {})
  create(
    @Body() createProductDto: CreateProductDto,
    @GetCustomUser() user: User,
  ): Promise<CreatedPayload> {
    return this.productsService.create(createProductDto, user);
  }
  /**
   * Actualizar
   * @param {string} id Id
   * @param updateProductDto Datos del producto
   * @returns {Promise<Product>}
   */
  @Patch(':id')
  @AuthComp(CREATE_UPDATE_ROLES, {})
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetCustomUser() user: User,
  ): Promise<UpdatedPayload> {
    return this.productsService.update(id, updateProductDto, user);
  }
  /**
   * Eliminar un producto
   * @param {string} id Id
   * @returns {Promise<DeletedPayload>}
   */
  @Delete(':id')
  @AuthComp([UserRoles.ROOT, UserRoles.ADMIN], { strictRole: true })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeletedPayload> {
    return this.productsService.remove(id);
  }
  /**
   * Elimina todos los productos
   * @returns
   */
  @Delete('infinity-gauntlet')
  removeAll() {
    return this.productsService.removeAll();
  }
}
