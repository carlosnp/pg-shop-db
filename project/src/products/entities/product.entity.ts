import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  /** Identificador */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /** Titulo */
  @Column({ type: 'text', unique: true })
  title: string;
  /** Descripcion. Opcional */
  @Column({ type: 'text', nullable: true })
  description: string;
  /** Slug */
  @Column({ type: 'text', unique: true })
  slug: string;
  /** Precio base */
  @Column({ type: 'numeric' })
  price: number;
  /** Existencias. Opcional */
  @Column({ type: 'int', default: 0 })
  stock: number;
  /** Unidad del producto. Opcional */
  @Column({ type: 'text', default: 'UNIT' })
  unit: string;
  /** Tamaños. Opcional */
  @Column({ type: 'text', array: true, default: [] })
  sizes: string[];
  /** Etiquetas. Opcional */
  @Column({ type: 'text', array: true, default: [] })
  tags: string[];
}
