import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { getArticleDetail } from "../services/article.service";

export const useArticleDetail = (id?: string) => {
  return useQuery({
    queryKey: queryKeys.article.detail(id || ""),

    queryFn: () => getArticleDetail(id!),

    enabled: !!id,
  });
};
