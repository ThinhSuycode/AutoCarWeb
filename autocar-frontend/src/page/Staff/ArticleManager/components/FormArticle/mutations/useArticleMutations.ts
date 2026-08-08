import toast from "react-hot-toast";
import { articleDetailService } from "../../../services/articleDetail.service";
import { articleService } from "../../../services/article.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateArticleDto,
  UpdateArticleDto,
} from "../../../../../../types/article/article.dto";

const useArticleMutations = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: articleService.getAll,
  });

  const articles = data?.data || [];

  const createMutation = useMutation({
    mutationFn: async (formData: CreateArticleDto) => {
      const newArticle = await articleService.create(formData);

      try {
        await articleDetailService.create({
          articleId: newArticle.data._id,
          sections: [
            {
              sectionType: "paragraph",
              content: "",
            },
          ],
          tags: [],
          relatedArticles: [],
        });
      } catch {
        // Detail chưa tạo được → không block flow chính
      }

      return newArticle;
    },

    onSuccess: (newArticle) => {
      toast.success("Tạo bài viết thành công!");

      queryClient.setQueryData(["articles"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: [newArticle, ...(old.data || [])],
        };
      });

      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },

    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Tạo bài viết thất bại!";
      toast.error(msg);
    },
  });
  // ── UPDATE ──────────────────────────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateArticleDto }) =>
      articleService.update(id, data),

    onSuccess: () => {
      toast.success("Cập nhật thành công!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },

    onError: () => toast.error("Cập nhật thất bại!"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
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

export default useArticleMutations;
