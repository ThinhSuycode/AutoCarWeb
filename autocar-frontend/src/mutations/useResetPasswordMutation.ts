import { useMutation } from "@tanstack/react-query";

import { resetPasswordApi } from "../services/auth.service";

const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      resetPasswordApi(token, password),
  });
};

export default useResetPasswordMutation;
