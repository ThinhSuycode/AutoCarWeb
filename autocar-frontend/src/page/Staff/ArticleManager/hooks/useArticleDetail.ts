import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { articleDetailService } from "../services/articleDetail.service";
import type {
  ArticleDetail,
  CreateArticleDetailDto,
} from "../../../../types/articles";

export const useArticleDetail = (articleId?: string) => {
  const queryClient = useQueryClient();

  // ───────── GET DETAIL ─────────
  const { data, isLoading, refetch } = useQuery<ArticleDetail | null>({
    queryKey: ["article-detail", articleId],
    queryFn: () => articleDetailService.getByArticleId(articleId!),
    enabled: !!articleId,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });
  // ───────── CREATE ─────────
  const createMutation = useMutation({
    mutationFn: (data: CreateArticleDetailDto) =>
      articleDetailService.create(data),

    onSuccess: () => {
      toast.success("Tạo nội dung thành công!");

      queryClient.invalidateQueries({
        queryKey: ["article-detail", articleId],
      });
    },

    onError: () => {
      toast.error("Tạo nội dung thất bại!");
    },
  });

  // ───────── UPDATE ─────────
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      articleDetailService.update(id, data),

    onSuccess: () => {
      toast.success("Cập nhật nội dung thành công!");

      queryClient.invalidateQueries({
        queryKey: ["article-detail", articleId],
      });
    },

    onError: () => {
      toast.error("Cập nhật nội dung thất bại!");
    },
  });

  // ───────── DELETE ─────────
  const deleteMutation = useMutation({
    mutationFn: (id: string) => articleDetailService.delete(id),

    onSuccess: () => {
      toast.success("Xoá nội dung thành công!");

      queryClient.invalidateQueries({
        queryKey: ["article-detail", articleId],
      });
    },

    onError: () => {
      toast.error("Xoá nội dung thất bại!");
    },
  });

  return {
    articleDetail: data ?? null,

    detailLoading: isLoading,

    refetchDetail: refetch,

    createDetail: createMutation.mutate,

    updateDetail: updateMutation.mutate,

    deleteDetail: deleteMutation.mutate,

    creating: createMutation.isPending,

    updating: updateMutation.isPending,

    deleting: deleteMutation.isPending,
  };
};
