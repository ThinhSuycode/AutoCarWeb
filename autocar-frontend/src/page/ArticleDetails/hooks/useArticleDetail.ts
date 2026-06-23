import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../../../services/api";
import { createHandleReadArticle } from "../../../hooks/HandleArticles";
import type { UserType } from "../../../types/users";

import type {
  ArticleDetail,
  ArticleResponse,
  Articles,
} from "../../../types/articles";

interface Props {
  userInfo: UserType | undefined;
}

const useArticleDetail = ({ userInfo }: Props) => {
  const articlesCache = useRef<Articles[] | null>(null);
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(
    null,
  );

  const navigate = useNavigate();
  const [articlesRelative, setArticlesRelative] = useState<Articles[]>([]);
  const [userActive, setUserActive] = useState<UserType | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const handleReadArticle = useMemo(
    () => createHandleReadArticle(navigate),
    [navigate],
  );
  const [articleActive, setArticleActive] = useState<Articles | null>(null);

  //   CHECK USER ACTIVE
  useEffect(() => {
    if (!userInfo) return;
    setUserActive(userInfo);
  }, [userInfo]);

  // ───────────────── CHECK SAVE ─────────────────


  useEffect(() => {
    const fetchAll = async () => {
      if (!articleActive?._id) {
        return;
      }
      try {
        const detail = await callApi.getData<ArticleDetail>(
          `articleDetails/${articleActive._id}`,
        );

        setArticleDetail(detail ?? null);

        if (detail?.relatedArticles?.length) {
          let data: Articles[] = [];

          if (articlesCache.current) {
            data = articlesCache.current;
          } else {
            const res =
              await callApi.getData<ArticleResponse>("articles?all=true");
            data = res.data;
            articlesCache.current = data;
          }

          const related = data.filter((article) =>
            detail.relatedArticles.includes(article),
          );

          setArticlesRelative(related);
        } else {
          setArticlesRelative([]);
        }
      } catch (error) {
        console.error("Failed to fetch article data:", error);

        setArticlesRelative([]);
      } finally {
        // setLoading(false);
      }
    };

    fetchAll();
  }, [articleActive?._id]);

  return {
    handleReadArticle,
    articlesRelative,
    setArticlesRelative,
    isSaved,
    userActive,
  };
};

export default useArticleDetail;
