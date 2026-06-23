import { callApi, changeApi } from "../../../../services/api";
import type { ArticleResponse, Articles } from "../../../../types/articles";

export const articleService = {
  getAll: async () => {
    return await callApi.getData<ArticleResponse>("articles?all=true");
  },

  getDetail: async (id: string) => {
    return await callApi.getData<Articles>(`articles/${id}`);
  },

  create: async (data: Articles) => {
    return await changeApi.request<Articles>("articles", "add", data);
  },

  update: async (id: string, data: Articles) => {
    return await changeApi.request<Articles>("articles", "patch", data, id);
  },

  delete: async (id: string) => {
    return await changeApi.request("articles", "delete", undefined, id);
  },
};
