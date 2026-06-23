import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { getMeApi } from "../services/auth.service";
import type { UserType } from "../types/users";

export const useCurrentUser = (enabled: boolean) => {
  return useQuery<UserType>({
    queryKey: queryKeys.user.me,
    queryFn: getMeApi,
    enabled,
  });
};
