import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articlesManagerService } from "../../page/Admin/ArticlesManager/services/articlesManager.service";
import toast from "react-hot-toast";
import { queryKeys } from "../../queries/queryKeys";
import type { ArticleStatus } from "../../page/Staff/ArticleManager/constants/statusMapData";

const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ArticleStatus }) =>
      articlesManagerService.updateStatus(id, status),

    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công!");

      queryClient.invalidateQueries({
        queryKey: queryKeys.article.all,
      });
    },
  });
  return {
    updateStatus: statusMutation.mutateAsync,
    isPending: statusMutation.isPending,
  };
};

export default useUpdateStatus;
