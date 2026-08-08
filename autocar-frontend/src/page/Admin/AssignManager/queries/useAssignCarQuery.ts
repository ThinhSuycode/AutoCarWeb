import { useQuery } from "@tanstack/react-query";
import type { GetAllCarsQuery } from "../types/assignManagerType";
import { queryKeys } from "../../../../queries/queryKeys";
import { managerAdminServices } from "../../../../services/manager.service";
import type { ManagerCarsListResponse } from "../../../../types/user/manager.response";

const useAssignCarQuery = ({ page, limit, hasManager }: GetAllCarsQuery) => {
  return useQuery<ManagerCarsListResponse>({
    queryKey: queryKeys.managerCar.list({ page, limit, hasManager }),
    queryFn: () => managerAdminServices.getAllCar({ page, limit, hasManager }),
  });
};

export default useAssignCarQuery;
