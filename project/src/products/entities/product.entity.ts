import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BasicWithUuidEntity, generateSlug, getIncrement } from 'src/pg-shop';
import { AllUnits, GenericUnit, UnitsEnum } from '../enums';
import { ProductModel } from '../models';
import { ProductImage } from './product-image.entity';

@Entity({ name: 'products' })
export class Product extends BasicWithUuidEntity implements ProductModel {
  /**
   * Titulo
   */
  @Column({ type: 'text', unique: true })
  name: string;
  /**
   * Descripcion. Opcional
   */
  @Column({ type: 'text', nullable: true })
  description: string;
  /**
   * Slug
   */
  @Column({ type: 'text', unique: true })
  slug: string;
  /**
   * Marca. Opcional
   */
  @Column({ type: 'text', nullable: true })
  brand: string;
  /**
   * Margin
   */
  @Column({ type: 'float' })
  margin: number;
  /**
   * Precio base
   */
  @Column({ type: 'float' })
  price: number;
  /**
   * Precio de venta. Opcional
   */
  @Column({ type: 'float' })
  priceSale: number;
  /**
   * Existencias. Opcional
   */
  @Column({ type: 'int', default: 0 })
  stock: number;
  /**
   * Unidad del producto. Opcional
   */
  @Column({
    type: 'enum',
    enum: Object.values(AllUnits),
    default: GenericUnit.Unit,
  })
  unit: UnitsEnum;
  /**
   * Etiquetas. Opcional
   */
  @Column({ type: 'text', array: true, default: [] })
  tags: string[];
  /**
   * Images de un producto
   */
  @OneToMany(() => ProductImage, (img) => img.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImage[];
  /**
   * Precio de venta
   */
  @BeforeInsert()
  getSalePrice() {
    // const margin = this.margin ? this.margin : DEFAULT_MARGIN;
    // const priceSale = this.price * (1 + margin);
    // this.priceSale = Number(priceSale.toFixed(2));
    const { m, vf } = getIncrement(this.price, this.margin, this.priceSale);
    this.margin = m;
    this.priceSale = vf;
  }
  /**
   * Verifica antes de insertar un slug
   * Antes de insertar
   */
  @BeforeInsert()
  checkSlugInsert() {
    // Si no existe el slug, lo creamos. Si existe lo pasamos igual por las reglas
    if (!this.slug) {
      this.slug = generateSlug(this.name);
    } else {
      this.slug = generateSlug(this.slug);
    }
  }
  /**
   * Elimina los tags duplicados
   * Antes de insertar
   */
  @BeforeInsert()
  uniqueTags() {
    this.tags = [...new Set(this.tags)];
  }
  /**
   * Antes de actualizar
   */
  @BeforeUpdate()
  checkSlugUpdate() {
    // Verificamos el slug
    this.slug = generateSlug(this.slug);
  }
}
