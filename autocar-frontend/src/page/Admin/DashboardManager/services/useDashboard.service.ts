import { callApi } from "../../../../services/api";
import type { DashboardResponse } from "../../../../types/dashboard/dashboard.response";

export const dashboardServices = {
  getDashboardStats: async () => {
    const res = await callApi.getData<DashboardResponse>(
      "/admin/dashboard/stats",
    );
    return res;
  },
};
