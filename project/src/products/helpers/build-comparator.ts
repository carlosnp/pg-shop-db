import {
  FindOperator,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { ComparisonOperator } from '../entities';

/**
 * Tipo de funcion del resultado del mapa
 */
type FunctionResult<T> = (value: T) => FindOperator<T> | T;
/**
 * Interface para el contructor del comparador
 */
interface BuilderComprator {
  [x: string]: number | FindOperator<number>;
}
/**
 * Mapa de funciones
 */
const operatorMap: Record<ComparisonOperator, FunctionResult<number>> = {
  [ComparisonOperator.GT]: MoreThan,
  [ComparisonOperator.LT]: LessThan,
  [ComparisonOperator.GTE]: MoreThanOrEqual,
  [ComparisonOperator.LTE]: LessThanOrEqual,
  [ComparisonOperator.EQ]: (value) => value,
};
/**
 * Construye el comparador de numeros
 * @param value Valor
 * @param operator Operador
 * @returns
 */
export const buildComparator = (
  value: number,
  operator: ComparisonOperator,
  property: string,
): BuilderComprator => {
  const operatorFunction = operatorMap[operator];
  if (!operatorFunction) {
    throw new Error('Operador de comparación inválido');
  }
  return { [property]: operatorFunction(value) };
};
