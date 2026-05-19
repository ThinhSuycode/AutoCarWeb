import { useQuery } from "@tanstack/react-query";
import { callApi } from "../../../services/api";
import { useState } from "react";
import type { Car } from "../AssignManager/hooks/useAssignManager";
import type {
  DashboardResponse,
  DashboardStats,
} from "../../../types/dashboard";

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useDashboardManager = () => {
  const [carAll, setCarAll] = useState<Car[] | null>(null);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => callApi.getData<DashboardResponse>("dashboard/stats"),
    staleTime: 1000 * 60 * 2, // cache 2 phút — không fetch lại khi vào lại trang
    refetchOnWindowFocus: false, // không refetch khi focus window
  });

  const stats: DashboardStats = data?.data ?? {
    totalCars: 0,
    totalUsers: 0,
    totalStaff: 0,
    totalArticles: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    recentAppointments: [],
    recentUsers: [],
  };

  return { stats, isLoading, isFetching, refetch };
};
