import useDashboardQuery from "../queries/useDashboardQuery";

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useDashboardManager = () => {
  const { data, isLoading, isFetching, refetch } = useDashboardQuery();

  return { stats: data?.data, isLoading, isFetching, refetch };
};
