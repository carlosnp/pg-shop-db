import { UnitsEnum } from 'src/products';

export interface ProductSeed {
  /**
   * Titulo
   */
  title: string;
  /**
   * Descripcion. Opcional
   */
  description: string;
  /**
   * Slug
   */
  slug?: string;
  /**
   * Marca. Opcional
   */
  brand?: string;
  /**
   * Precio base
   */
  price: number;
  /**
   * Existencias. Opcional
   */
  stock: number;
  /**
   * Unidad del producto. Opcional
   */
  unit?: UnitsEnum;
  /**
   * Tamaños. Opcional
   */
  sizes: string[];
  /**
   * Etiquetas. Opcional
   */
  tags: string[];
  /**
   * Images de un producto
   */
  images: string[];
}
