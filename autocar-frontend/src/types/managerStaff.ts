import type { CarType } from "./car";

export type ManagerStatus =
  | "pending"
  | "received"
  | "maintenance"
  | "ready"
  | "completed";

export interface CarManagerType extends CarType {
  managerStatus: ManagerStatus;
}
export interface CarManagerResponse {
  data: CarManagerType[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
