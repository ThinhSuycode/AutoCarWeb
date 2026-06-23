import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queries/queryKeys";
import { loginApi } from "../services/auth.service";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),

    onSuccess: async (res) => {
      localStorage.setItem("token", res.token);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.user.me,
      });
    },
  });
};
