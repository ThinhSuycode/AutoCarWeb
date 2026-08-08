import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../queries/queryKeys";
import { dashboardServices } from "../services/useDashboard.service";

const useDashboardQuery = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.all,
    queryFn: dashboardServices.getDashboardStats,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export default useDashboardQuery;
