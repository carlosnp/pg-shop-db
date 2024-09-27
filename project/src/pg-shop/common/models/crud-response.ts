/**
 * Respuesta de un CRUD
 */
export interface CrudResponse<T, E> {
  id?: string;
  entity?: T;
  error?: E | unknown;
}
