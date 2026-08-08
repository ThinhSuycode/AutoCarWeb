import { callApi, changeApi } from "../../../../services/api";
import type {
  CreateArticleDto,
  UpdateArticleDto,
} from "../../../../types/article/article.dto";
import type {
  ArticleListResponse,
  ArticleResponse,
} from "../../../../types/article/article.response";
import type { Article } from "../../../../types/article/article.type";

export const articleService = {
  getAll: async () => {
    return await callApi.getData<ArticleListResponse>("articles?all=true");
  },

  getDetail: async (id: string) => {
    return await callApi.getData<Article>(`articles/${id}`);
  },

  create: async (data: CreateArticleDto) => {
    return await changeApi.request<ArticleResponse>("articles", "add", data);
  },

  update: async (id: string, data: UpdateArticleDto) => {
    return await changeApi.request<Article>("articles", "patch", data, id);
  },

  delete: async (id: string) => {
    return await changeApi.request("articles", "delete", undefined, id);
  },
};
