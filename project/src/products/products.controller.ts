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
import { PaginationDto } from 'src/common';

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
   * @param {PaginationDto} pag Paginacion
   * @returns
   */
  @Get('/pag')
  getAllPagination(@Query() pagDto: PaginationDto): Promise<Product[]> {
    return this.productsService.getAllPagination(pagDto);
  }
  /**
   * Encontrar por Id
   * @param {string} id Id
   * @returns
   */
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }
  /**
   * Eliminar un producto
   * @param {string} id Id
   * @returns {Promise<Product>}
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
