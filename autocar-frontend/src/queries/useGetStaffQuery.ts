import { useQuery } from "@tanstack/react-query";
import type { UserType } from "../types/users";
import { queryKeys } from "./queryKeys";
import type { Role } from "../types/menu";
import { userService } from "../services/user.service";
import type { PaginatedResponse } from "../types/pagination";

export const useGetStaffQuery = (role: string) => {
  return useQuery<PaginatedResponse<UserType>>({
    queryKey: queryKeys.user.all,
    queryFn: () => userService.getRoleUser(role as Role),
  });
};
