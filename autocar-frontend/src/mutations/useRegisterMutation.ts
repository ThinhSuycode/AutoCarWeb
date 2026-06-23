import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerApi } from "../services/auth.service";
import type { RegisterPayloadSchemaType } from "../schemas/auth.schema";
import { queryKeys } from "../queries/queryKeys";

const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      email,
      username,
      phone,
      password,
    }: RegisterPayloadSchemaType) =>
      registerApi({ email, username, phone, password }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
  });
};

export default useRegisterMutation;
