import { CrudResponse, SearchResult } from 'src/common';
import { Product } from '../entities';

export type ListPayload = SearchResult<Product>;

export type CreatedPayload = CrudResponse<Product>;

export type UpdatedPayload = CrudResponse<Product>;

export type DeletedPayload = CrudResponse<Product>;
