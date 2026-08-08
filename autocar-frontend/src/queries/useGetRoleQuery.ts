import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { userService } from "../services/user.service";
import type { UserListResponse } from "../types/user/user.response";
import type { Role } from "../types/common/role.type";

export const useGetRoleQuery = (role: string) => {
  return useQuery<UserListResponse>({
    queryKey: queryKeys.user.all,
    queryFn: () => userService.getRoleUser(role as Role),
  });
};
