import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatarApi } from "../../../../../../services/auth.service";
import { queryKeys } from "../../../../../../queries/queryKeys";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  const updateAvatar = useMutation({
    mutationFn: ({ userId, avatar }: { userId: string; avatar: File }) =>
      updateAvatarApi(userId, avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.all,
      });
    },
  });
  return {
    updateAvatarMutation: updateAvatar.mutateAsync,
  };
};
