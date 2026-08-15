import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useArticleDetail as useArticleDetailQuery } from "../../../queries/articleQuery/useArticleDetail";
import { useCurrentUser } from "../../../queries/userQuery/useCurrentUser";
import useArticleSave from "./useArticleSave";
import { createHandleReadArticle } from "../../../hooks/HandleArticles";

const useArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: articleDetail, isLoading } = useArticleDetailQuery(id);

  const login = !!localStorage.getItem("token");

  const { data: userActive } = useCurrentUser(login);

  const handleReadArticle = useMemo(
    () => createHandleReadArticle(navigate),
    [navigate],
  );

  const { onHandleSaveArticle, isSaved } = useArticleSave({
    userActive: userActive ?? null,
    articleDetail,
  });

  return {
    articleDetail,
    isLoading,
    isSaved,
    onHandleSaveArticle,
    handleReadArticle,
  };
};

export default useArticleDetail;
