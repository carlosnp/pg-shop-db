import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
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
}
