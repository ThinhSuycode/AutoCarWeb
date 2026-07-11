import type { ArticleDetail, ArticleResponse } from "../types/articles";
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
  return callApi.getData<ArticleResponse>("articles?all=true");
};

export const getArticles = async ({
  page,
  limit,
  search,
  status,
  category,
}: GetArticlesParams) => {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));

  if (search?.trim()) {
    params.append("search", search.trim());
  }

  if (category) {
    params.set("category", category);
  }

  if (status && status !== "all") {
    params.set("status", status);
  }
  const response = await callApi.getData<ArticleResponse>(
    `articles?${params.toString()}`,
  );

  return response;
};
