/**
 * Respuesta de un CRUD
 */
export interface CrudResponse<T> {
  id?: string;
  entity?: T;
  error?: unknown;
}
