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
  description?: string;
  /**
   * Slug
   */
  slug?: string;
  /**
   * Marca. Opcional
   */
  brand?: string;
  /**
   * Margen
   */
  margin?: number;
  /**
   * Precio base
   */
  price: number;
  /**
   * Precio de venta
   */
  priceSale?: number;
  /**
   * Existencias. Opcional
   */
  stock?: number;
  /**
   * Unidad del producto. Opcional
   */
  unit?: UnitsEnum;
  /**
   * Etiquetas. Opcional
   */
  tags: string[];
}
/**
 * Interface para crear un producto
 */
export interface ProductModelCreate extends ProductBase {
  /**
   * Images de un producto
   */
  images: string[];
}
/**
 * interface del modelo base del producto
 */
export interface ProductModelBase extends ProductBase {
  /**
   * Images de un producto
   */
  images: ProductImageModel[];
}
/**
 * Modelo del producto
 */
export interface ProductModel extends ProductModelBase {
  id: string;
}
