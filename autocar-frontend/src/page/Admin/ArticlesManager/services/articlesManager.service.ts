import { changeApi } from "../../../../services/api";
import type { Articles } from "../../../../types/articles";
import type { ArticleStatus } from "../../../Staff/ArticleManager/constants/statusMapData";

export interface GetArticlesParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  status?: string;
}

export const articlesManagerService = {
  updateStatus: (id: string, status: ArticleStatus) =>
    changeApi.request<Articles>("articles", "patch", { status }, id),
};
