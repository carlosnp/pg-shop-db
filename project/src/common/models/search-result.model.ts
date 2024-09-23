/**
 * Interface para la lista de items
 */
export interface SearchResult<T> {
  data: T[];
  total: number;
}
