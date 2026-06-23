import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../types/users";
import { updateArticleSave } from "../services/user.service";
import { queryKeys } from "../queries/queryKeys";
import toast from "react-hot-toast";

export interface ArticleSavePayload {
  id: string;
  data: UserType;
}

const useArticleSaveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<UserType, Error, ArticleSavePayload>({
    mutationFn: ({ id, data }) => updateArticleSave(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.me,
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export default useArticleSaveMutation;
