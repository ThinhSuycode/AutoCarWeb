import type { ArticleDetail } from "../types/article/article-detail.type";
import type { ArticleListResponse } from "../types/article/article.response";
import { callApi } from "./api";

export const getArticleDetail = (id: string) => {
  return callApi.getData<ArticleDetail>(`articleDetails/${id}`);
};

export interface GetArticlesParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  status?: string;
}

export const getArticlesAll = () => {
  return callApi.getData<ArticleListResponse>("articles?all=true");
};

export const getArticles = async ({
  page,
  limit,
  search,
  status,
  category,
}: GetArticlesParams) => {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  if (category) {
    params.set("category", category);
  }

  if (status && status !== "all") {
    params.set("status", status);
  }
  const response = await callApi.getData<ArticleListResponse>(
    `articles?${params.toString()}`,
  );

  return response;
};
