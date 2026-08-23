import { useAdminDashboardQuery } from "../../../../queries/dashboardQuery/useDashboardQuery";

export const useDashboardManager = () => {
  const { data, isLoading, isFetching, refetch } = useAdminDashboardQuery();

  return { stats: data?.data, isLoading, isFetching, refetch };
};
