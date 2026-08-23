import { changeApi } from "../../../../services/api";
import type { Article } from "../../../../types/article/article.type";
import type { ArticleStatus } from "../../../Staff/ArticleManager/constants/statusMapData";

export const articlesManagerService = {
  updateStatus: (id: string, status: ArticleStatus) =>
    changeApi.request<Article>(`articles/${id}/status`, "patch", { status }),
};
