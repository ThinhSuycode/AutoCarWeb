import type {
  AdminDashboardResponse,
  StaffDashboardResponse,
} from "../types/dashboard/dashboard.response";
import { callApi } from "./api";

export const dashboardServices = {
  getAdminDashboardStats: async () => {
    const res = await callApi.getData<AdminDashboardResponse>(
      "/admin/dashboard/stats",
    );
    return res;
  },
  getStaffDashboardStats: async () => {
    const res = await callApi.getData<StaffDashboardResponse>(
      "/staff/dashboard/stats",
    );
    return res;
  },
};
