import type { ApiResponse } from "../common/response";
import type {
  AdminDashboardStats,
  StaffDashboardStats,
} from "./dashboard.type";

export type AdminDashboardResponse = ApiResponse<AdminDashboardStats>;
export type StaffDashboardResponse = ApiResponse<StaffDashboardStats>;
