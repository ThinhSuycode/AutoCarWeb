import { useQuery } from "@tanstack/react-query";
import { managerStaffServices } from "../../../../services/car.service";
import type { CarManagerResponse } from "../../../../types/managerStaff";

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
  const { data, isLoading, refetch } = useQuery<CarManagerResponse>({
    queryKey: ["managedCars", { search, page, limit, managerStatus }],
    queryFn: () =>
      managerStaffServices.getMyCars({ search, page, limit, managerStatus }),
  });

  return {
    cars: data?.data ?? [],
    isLoading,
    refetch,
  };
};
