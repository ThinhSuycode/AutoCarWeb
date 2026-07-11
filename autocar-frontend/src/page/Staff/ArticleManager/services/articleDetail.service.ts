import { callApi, changeApi } from "../../../../services/api";
import type {
  ArticleDetail,
  CreateArticleDetailDto,
  UpdateArticleDetailDto,
} from "../../../../types/articles";

export const articleDetailService = {
  getByArticleId: async (articleId: string) => {
    return await callApi.getData<ArticleDetail>(`articleDetails/${articleId}`);
  },

  create: async (data: CreateArticleDetailDto) => {
    return await changeApi.request<ArticleDetail>(
      "articleDetails",
      "add",
      data,
    );
  },

  update: async (id: string, data: UpdateArticleDetailDto) => {
    return await changeApi.request<ArticleDetail>(
      "articleDetails",
      "patch",
      data,
      id,
    );
  },

  delete: async (id: string) => {
    return await changeApi.request("articleDetails", "delete", undefined, id);
  },
};
