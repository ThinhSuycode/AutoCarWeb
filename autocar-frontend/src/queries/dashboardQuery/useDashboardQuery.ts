import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { dashboardServices } from "../../services/dashBoard.service";

export const useAdminDashboardQuery = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: dashboardServices.getAdminDashboardStats,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useStaffDashboardQuery = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: dashboardServices.getStaffDashboardStats,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
