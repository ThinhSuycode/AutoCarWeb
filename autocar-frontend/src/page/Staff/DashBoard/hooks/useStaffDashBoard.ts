import { useStaffDashboardQuery } from "../../../../queries/dashboardQuery/useDashboardQuery";

export const useStaffDashBoard = () => {
  const { data: staffDashBoard, isPending } = useStaffDashboardQuery();
  return {
    stats: staffDashBoard?.data,
    isLoading: isPending,
  };
};
