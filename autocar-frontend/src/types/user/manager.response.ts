import type { ApiListResponse, ApiResponse } from "../common/response";
import type { Staff } from "../staff/staff.type";
import type { ManagerCar } from "./manager-cars.type";

export type ManagerCarsListResponse = ApiListResponse<ManagerCar>;

export type StaffResponse = ApiResponse<Staff>;

export type StaffListResponse = ApiListResponse<Staff>;
