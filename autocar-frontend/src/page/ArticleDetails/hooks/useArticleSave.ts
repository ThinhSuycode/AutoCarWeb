import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useArticleSaveMutation from "../../../mutations/UserMutation/useArticleSaveMutation";
import type { UserType } from "../../../types/user/user.type";
import type { ArticleDetail } from "../../../types/article/article-detail.type";

interface Props {
  userActive: UserType | null;
  articleDetail?: ArticleDetail;
}

const useArticleSave = ({ userActive, articleDetail }: Props) => {
  const navigate = useNavigate();

  const articleSaveMutation = useArticleSaveMutation();

  const articleId = articleDetail?.articleId;

  const isSaved = useMemo(() => {
    if (!userActive || !articleId) return false;

    return (
      userActive.articleSave?.some((item) => item._id === articleId._id) ??
      false
    );
  }, [userActive, articleId]);

  const onHandleSaveArticle = useCallback(async () => {
    if (!userActive) {
      toast.error("Vui lòng đăng nhập để lưu bài viết!");

      setTimeout(() => {
        navigate("/dang-nhap");
      }, 1500);

      return;
    }

    try {
      await articleSaveMutation.mutateAsync({
        id: userActive._id ?? "",
        articleId: articleId?._id ?? "",
      });

      toast.success(isSaved ? "Đã bỏ lưu bài viết!" : "Đã lưu bài viết!");
    } catch (error) {
      console.error(error);
    }
  }, [userActive, articleId, isSaved, articleSaveMutation, navigate]);

  return {
    isSaved,
    onHandleSaveArticle,
    isLoading: articleSaveMutation.isPending,
  };
};

export default useArticleSave;
