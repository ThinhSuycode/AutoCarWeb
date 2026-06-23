import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { Dispatch, SetStateAction } from "react";

import type { UserType } from "../../../types/users";
import type { ArticleDetail } from "../../../types/articles";
import useArticleSaveMutation from "../../../mutations/useArticleSaveMutation";

interface Props {
  userActive: UserType | null;
  articleDetail?: ArticleDetail;
  setUserActive: Dispatch<SetStateAction<UserType | null>>;
}

const useArticleSave = ({
  userActive,
  articleDetail,
  setUserActive,
}: Props) => {
  const navigate = useNavigate();
  const articleSaveMutation = useArticleSaveMutation();
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const onHandleSaveArticle = useCallback(async () => {
    if (!userActive) {
      toast.error("Vui lòng đăng nhập để lưu bài viết!");

      setTimeout(() => {
        navigate("/dang-nhap");
      }, 1500);

      return;
    }

    const articleId = articleDetail?.articleId._id;

    if (!articleId) return;

    const currentSaved = userActive.articleSave ?? [];
    const isAlreadySaved = currentSaved.includes(articleId);

    const updatedSave = isAlreadySaved
      ? currentSaved.filter((id) => id !== articleId)
      : [...currentSaved, articleId];

    const previousUser = userActive;

    const updatedUser: UserType = {
      ...userActive,
      articleSave: updatedSave,
    };

    // Optimistic update
    setIsSaved(!isAlreadySaved);
    setUserActive(updatedUser);

    try {
      await articleSaveMutation.mutateAsync({
        id: userActive._id ?? "",
        data: updatedUser,
      });

      toast.success(
        isAlreadySaved ? "Đã bỏ lưu bài viết!" : "Đã lưu bài viết!",
      );
    } catch (error) {
      // Rollback
      setIsSaved(isAlreadySaved);
      setUserActive(previousUser);

      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      console.error(error);
    }
  }, [
    userActive,
    articleDetail?.articleId?._id,
    navigate,
    articleSaveMutation,
    setIsSaved,
    setUserActive,
  ]);
  useEffect(() => {
    if (userActive && articleDetail?.articleId) {
      setIsSaved(
        userActive.articleSave?.includes(articleDetail.articleId._id) ?? false,
      );
    }
  }, [userActive, articleDetail?.articleId]);
  return {
    onHandleSaveArticle,
    isSaved,
  };
};

export default useArticleSave;
