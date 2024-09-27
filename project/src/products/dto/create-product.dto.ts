import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

import { AllUnits, UnitsEnum } from '../enums';

export class CreateProductDto {
  /**
   * Titulo
   */
  @IsString()
  @MinLength(1)
  name: string;
  /**
   * Precio base
   */
  @IsNumber()
  @IsPositive()
  price: number;
  /**
   * Descripcion. Opcional
   */
  @IsString()
  @IsOptional()
  description?: string;
  /**
   * Marca. Opcional
   */
  @IsString()
  @IsOptional()
  brand?: string;
  /**
   * Slug
   */
  @IsString()
  @IsOptional()
  slug?: string;
  /**
   * Existencias. Opcional
   */
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;
  /**
   * Unidad del producto. Opcional
   */
  @IsEnum(AllUnits)
  @IsOptional()
  unit?: UnitsEnum;
  /**
   * Tamaños. Opcional
   */
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  sizes: string[];
  /**
   * Etiquetas. Opcional\
   */
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];
  /**
   * Lista de imagenes
   */
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];
}
