import type { CarType } from "./car.type";

export interface CarPagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface CarListResponse {
  success: boolean;

  data: CarType[];

  pagination: CarPagination;
}
export interface CarResponse {
  success: boolean;

  data: CarType;

  pagination?: CarPagination;
}

export interface CarDetailResponse {
  success: boolean;

  data: CarType;
}
