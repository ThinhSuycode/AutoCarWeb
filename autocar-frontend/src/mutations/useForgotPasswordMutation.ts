import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../services/auth.service";

const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (email: string) => await forgotPasswordApi(email),
  });
};

export default useForgotPasswordMutation;
