import { useQuery } from "@tanstack/react-query";
import { carService } from "../services/car.service";
import type { CarManagerResponse } from "../types/managerStaff";

export const useStaffManager = () => {
  const { data, isLoading, refetch } = useQuery<CarManagerResponse>({
    queryKey: ["manager-cars"],
    queryFn: () => carService.getMyCars(),
  });

  return {
    cars: data?.data ?? [],
    isLoading,
    refetch,
  };
};
