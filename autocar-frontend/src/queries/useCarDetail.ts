import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { getCarDetail } from "../services/car.service";

export const useCarDetail = (id?: string) => {
  return useQuery({
    queryKey: queryKeys.car.detail(id || ""),

    queryFn: () => getCarDetail(id!),

    enabled: !!id,
  });
};
