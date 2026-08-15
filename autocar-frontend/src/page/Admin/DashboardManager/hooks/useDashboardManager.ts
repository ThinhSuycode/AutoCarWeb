import useDashboardQuery from "../../../../queries/dashboardQuery/useDashboardQuery";

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useDashboardManager = () => {
  const { data, isLoading, isFetching, refetch } = useDashboardQuery();

  return { stats: data?.data, isLoading, isFetching, refetch };
};
