import type { ArticleDetail, ArticleResponse } from "../types/articles";
import { callApi } from "./api";

export const getArticleDetail = (id: string) => {
  return callApi.getData<ArticleDetail>(`articleDetails/${id}`);
};

interface GetArticlesParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}

export const getArticlesAll = () => {
  return callApi.getData<ArticleResponse>("articles?all=true");
};

export const getArticles = async ({
  page,
  limit,
  search,
  category,
}: GetArticlesParams) => {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));

  if (search?.trim()) {
    params.append("search", search.trim());
  }

  if (category && category !== "Tất cả") {
    params.append("category", category);
  }

  const response = await callApi.getData<ArticleResponse>(
    `articles?${params.toString()}`,
  );

  return response;
};
