import type { Pagination } from "./pagination";

export interface ApiResponse<T> {
  success: boolean;

  pagination?: Pagination;
  data: T;
}

export interface ApiListResponse<T> {
  success: boolean;

  data: T[];

  pagination?: Pagination;
}
