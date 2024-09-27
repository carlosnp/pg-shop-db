import { ProductImageModel } from './product-image.model';
import { UnitsEnum } from '../enums';

/**
 * Producto
 */
export interface ProductBase {
  /**
   * Nombre del producto
   */
  name: string;
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
  images: ProductImageModel[];
}

export interface ProductModel extends ProductBase {
  id: string;
}
