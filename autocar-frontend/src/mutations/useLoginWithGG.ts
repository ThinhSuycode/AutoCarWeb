import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithGoogleApi } from "../services/auth.service";
import { queryKeys } from "../queries/queryKeys";

const useLoginWithGG = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ credential }: { credential: string }) =>
      await loginWithGoogleApi(credential),
    onSuccess: (res) => {
      localStorage.setItem("token", res);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
  });
};

export default useLoginWithGG;
