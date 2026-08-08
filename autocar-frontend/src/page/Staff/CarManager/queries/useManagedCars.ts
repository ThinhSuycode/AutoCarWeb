import { useQuery } from "@tanstack/react-query";
import { managerStaffServices } from "../../../../services/manager.service";
import type { ManagerCarsListResponse } from "../../../../types/user/manager.response";

interface Props {
  search: string;
  page?: number;
  limit?: number;
  managerStatus?: string;
}

export const useManagedCars = ({
  search,
  page,
  limit,
  managerStatus,
}: Props) => {
  const { data, isLoading, refetch } = useQuery<ManagerCarsListResponse>({
    queryKey: ["manager-cars", { search, page, limit, managerStatus }],
    queryFn: () =>
      managerStaffServices.getMyCars({ search, page, limit, managerStatus }),
  });

  return {
    cars: data?.data ?? [],
    isLoading,
    refetch,
  };
};
