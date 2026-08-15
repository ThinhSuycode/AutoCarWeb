import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userService } from "../../services/user.service";
import { queryKeys } from "../../queries/queryKeys";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteUser = useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.all,
      });
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Lỗi khi thêm người dùng";
      toast.error(msg);
    },
  });

  return {
    deleteUserMutation: deleteUser.mutateAsync,
    isDeleting: deleteUser.isPending,
  };
};
