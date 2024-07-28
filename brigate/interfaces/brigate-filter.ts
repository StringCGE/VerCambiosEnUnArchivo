import { RequestPaginated } from '../../../core/interfaces/menu-item';

export interface BrigateFilter /*extends RequestPaginated*/ {
  id?: number;
  name?: string;
  sort?: string;
  offset: number;
  take?: number;

}
