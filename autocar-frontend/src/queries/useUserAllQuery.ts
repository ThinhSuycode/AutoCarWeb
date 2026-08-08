import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { userService } from "../services/user.service";
import type { UserListResponse } from "../types/user/user.response";

interface Props {
  page: number;
  limit: number;
  search?: string;
  role?: string;
}

export const useUserAllQuery = ({ page, limit, search, role }: Props) => {
  return useQuery<UserListResponse>({
    queryKey: queryKeys.user.list({ page, limit, search, role }),
    queryFn: () => userService.getAllUser({ page, limit, search, role }),
  });
};
