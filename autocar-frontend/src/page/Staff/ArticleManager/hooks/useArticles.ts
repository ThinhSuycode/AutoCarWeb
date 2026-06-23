import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { articleService } from "../services/article.service";
import { articleDetailService } from "../services/articleDetail.service";

export const useArticles = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: articleService.getAll,
  });

  const articles = data?.data || [];

  const createMutation = useMutation({
    mutationFn: async (formData: any) => {
      const newArticle = await articleService.create(formData);

      await articleDetailService.create({
        articleId: newArticle,
        sections: [{ sectionType: "paragraph", content: "" }],
        tags: [],
        relatedArticles: [],
      });

      return newArticle;
    },

    onSuccess: (newArticle) => {
      toast.success("Tạo bài viết thành công!");

      // Cập nhật cache ngay lập tức — không cần reload
      queryClient.setQueryData(["articles"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: [newArticle, ...(old.data || [])],
        };
      });

      // Đồng thời invalidate để fetch lại data mới nhất
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },

    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Tạo bài viết thất bại!";
      toast.error(msg);
    },
  });
  // ── UPDATE ──────────────────────────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      articleService.update(id, data),

    onSuccess: () => {
      toast.success("Cập nhật thành công!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },

    onError: () => toast.error("Cập nhật thất bại!"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Chỉ xoá article — KHÔNG xoá detail ở đây
      return await articleService.delete(id);
    },

    onSuccess: async (_, id) => {
      toast.success("Xoá thành công bài viết!");
      try {
        await articleDetailService.delete(id);
      } catch {
        // Article chưa có detail → bỏ qua bình thường
      }

      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },

    onError: () => toast.error("Xoá thất bại!"),
  });

  return {
    articles,
    isLoading,
    createArticle: createMutation.mutate,
    updateArticle: updateMutation.mutate,
    deleteArticle: deleteMutation.mutate,
    createLoading: createMutation.isPending,
    updateLoading: updateMutation.isPending,
    deleteLoading: deleteMutation.isPending,
  };
};
