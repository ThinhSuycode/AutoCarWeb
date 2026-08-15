import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { getMeApi } from "../../services/auth.service";
import type { UserType } from "../../types/user/user.type";

export const useCurrentUser = (enabled: boolean) => {
  return useQuery<UserType | null>({
    queryKey: queryKeys.user.me,
    queryFn: getMeApi,
    enabled,
  });
};
