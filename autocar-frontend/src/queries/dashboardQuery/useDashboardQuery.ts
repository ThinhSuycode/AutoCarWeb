import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { dashboardServices } from "../../page/Admin/DashboardManager/services/useDashboard.service";

const useDashboardQuery = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: dashboardServices.getDashboardStats,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export default useDashboardQuery;
