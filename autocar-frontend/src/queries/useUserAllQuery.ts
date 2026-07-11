import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import type { UserType } from "../types/users";
import type { PaginatedResponse } from "../types/pagination";
import { userService } from "../services/user.service";

interface Props {
  page: number;
  limit: number;
  search?: string;
  role?: string;
}

export const useUserAllQuery = ({ page, limit, search, role }: Props) => {
  return useQuery<PaginatedResponse<UserType>>({
    queryKey: queryKeys.user.list({ page, limit, search, role }),
    queryFn: () => userService.getAllUser({ page, limit, search, role }),
  });
};
