import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { carService } from "../services/car.service";
import type { CarListResponse } from "../types/car/car.response";

interface Params {
  page: number;
  limit: number;
  search: string;
}

export const useCarAllQuery = ({ page, limit, search }: Params) => {
  return useQuery({
    queryKey: queryKeys.car.list({ page, limit, search }),
    queryFn: () => carService.getAll({ page, limit, search }),
  });
};

export const useGetCars = () => {
  return useQuery<CarListResponse>({
    queryKey: queryKeys.car.all,
    queryFn: carService.getCars,
  });
};
