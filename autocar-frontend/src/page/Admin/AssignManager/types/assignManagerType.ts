export type FilterType = "all" | "true" | "false";

export interface GetAllCarsQuery {
  page: number;
  limit: number;
  hasManager: FilterType;
}

export interface AssignManagerPayload {
  carId: string;
  managerId: string;
}
