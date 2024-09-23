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
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { ComparisonOperator, PaginationDto } from 'src/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  /**
   * Crear un producto
   * @param { CreateProductDto } createProductDto
   * @returns { Promise<Product> } Producto
   */
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }
  /**
   * Lista de productos
   * @returns {Promise<Product[]>}
   */
  @Get()
  getAll(): Promise<Product[]> {
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
   * @returns {Promise<Product[]>}
   */
  @Get('by-title') findBytitle(
    @Query('title') title: string,
  ): Promise<Product[]> {
    const products = this.productsService.findByTitle(title);
    return products;
  }
  /**
   * Obtener productos por precio
   * @param {number} price Precio
   * @param {ComparisonOperator} operator Operador
   * @returns {Promise<Product[]>}
   */
  @Get('by-price') findByPrice(
    @Query('price') price: number,
    @Query('operator') operator: ComparisonOperator,
  ): Promise<Product[]> {
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
   * Actualizar
   * @param {string} id Id
   * @param updateProductDto Datos del producto
   * @returns {Promise<Product>}
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }
  /**
   * Eliminar un producto
   * @param {string} id Id
   * @returns {Promise<Product>}
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.remove(id);
  }
}
