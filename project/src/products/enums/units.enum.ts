/**
 * Unidad de medida generica
 */
export enum GenericUnit {
  Unit = 'Unit',
}
/**
 * Unidades de peso
 */
export enum WeightUnit {
  /** Gramos */
  G = 'g',
  /** Kilogramos */
  KG = 'kg',
  /** Libras */
  LB = 'lb',
  /** Onzas */
  OZ = 'oz',
  /** Toneladas métricas */
  T = 't',
}
/**
 * Unidades de volumen
 */
export enum VolumeUnit {
  /** Litros */
  L = 'L',
  /** Mililitros */
  ML = 'mL',
  /** Galones (EE.UU.) */
  GAL = 'gal',
  /** Cuartos (EE.UU.) */
  QT = 'qt',
  /** Pintos (EE.UU.) */
  PT = 'pt',
  /** Metros cúbicos */
  M3 = 'm3',
}
/**
 * Unidad de medida de un producto
 */
export type UnitsEnum = GenericUnit | WeightUnit | VolumeUnit;

export const AllUnits = [
  ...Object.values(GenericUnit),
  ...Object.values(WeightUnit),
  ...Object.values(VolumeUnit),
];
