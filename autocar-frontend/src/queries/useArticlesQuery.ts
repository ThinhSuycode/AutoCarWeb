import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { getArticles, getArticlesAll } from "../services/article.service";
import type { ArticleResponse } from "../types/articles";

interface Params {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  status?: string;
}

export const useArticlesQuery = ({
  page,
  limit,
  search,
  category,
  status,
}: Params) => {
  return useQuery<ArticleResponse>({
    queryKey: queryKeys.article.list({
      page,
      limit,
      search,
      category,
      status,
    }),

    queryFn: () =>
      getArticles({
        page,
        limit,
        search,
        category,
        status,
      }),
  });
};

export const useArticlesAll = () => {
  return useQuery({
    queryKey: queryKeys.article.all,
    queryFn: getArticlesAll,
  });
};
