/**
 * Interface para la lista de items
 */
export interface SearchResult<T> {
  /** Total de items */
  total: number;
  list: T[];
}
