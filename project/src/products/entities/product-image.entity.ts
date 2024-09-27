import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  /**
   * Identificador
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /**
   * Url de las imagenes
   */
  @Column('text')
  url: string;
  /**
   * Relacion con un producto
   */
  @ManyToOne(() => Product, (prod) => prod.images, { onDelete: 'CASCADE' })
  product: Product;
}
