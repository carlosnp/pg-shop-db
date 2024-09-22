import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AllUnits, GenericUnit, UnitsEnum } from './units.enum';
import { createSlug } from '../helpers';

@Entity({ name: 'product' })
export class Product {
  /**
   * Identificador
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /**
   * Titulo
   */
  @Column({ type: 'text', unique: true })
  title: string;
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
   * Precio base
   */
  @Column({ type: 'float' })
  price: number;
  /**
   * Existencias. Opcional
   */
  @Column({ type: 'int', default: 0 })
  stock: number;
  /**
   * Unidad del producto. Opcional\
   */
  @Column({
    type: 'enum',
    enum: Object.values(AllUnits),
    default: GenericUnit.Unit,
  })
  unit: UnitsEnum;
  /**
   * Tamaños. Opcional
   */
  @Column({ type: 'text', array: true, default: [] })
  sizes: string[];
  /**
   * Etiquetas. Opcional
   */
  @Column({ type: 'text', array: true, default: [] })
  tags: string[];
  /**
   * Antes de insertar
   */
  @BeforeInsert()
  checkSlugInsert() {
    // Si no existe el slug, lo creamos. Si existe lo pasamos igual por las reglas
    if (!this.slug) {
      this.slug = createSlug(this.title);
    } else {
      this.slug = createSlug(this.slug);
    }
  }
  /**
   * Antes de actualizar
   */
  @BeforeUpdate()
  checkSlugUpdate() {
    // Verificamos el slug
    this.slug = createSlug(this.slug);
  }
}
