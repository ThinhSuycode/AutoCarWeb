import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateArticleSave } from "../../services/user.service";
import { queryKeys } from "../../queries/queryKeys";

export interface ArticleSavePayload {
  id: string;
  articleId: string;
}

const useArticleSaveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, articleId }: ArticleSavePayload) =>
      await updateArticleSave(id, articleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.me,
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useArticleSaveMutation;
