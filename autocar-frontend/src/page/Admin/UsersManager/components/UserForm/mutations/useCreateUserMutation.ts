import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../queries/queryKeys";
import type { CreateUserInput } from "../../../../../../schemas/user.schema";
import { userService } from "../../../../../../services/user.service";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: (data: CreateUserInput) => userService.postUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.all,
      });
    },
  });

  return {
    createUserMutation: createUser.mutateAsync,
    isCreating: createUser.isPending,
  };
};
