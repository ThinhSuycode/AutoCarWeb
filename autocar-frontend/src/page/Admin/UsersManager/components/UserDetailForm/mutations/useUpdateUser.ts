import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../queries/queryKeys";
import { userService } from "../../../../../../services/user.service";
import type { UpdateUserInput } from "../../../../../../schemas/user.schema";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateUser = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserInput }) =>
      userService.updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.all,
      });
    },
  });
  return {
    updateUserMutation: updateUser.mutateAsync,
  };
};
