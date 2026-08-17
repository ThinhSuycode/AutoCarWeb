import type { Article } from "../types/article/article.type";
import { createSlug } from "../utils/slug";

export const createHandleReadArticle = (
  navigate: (path: string, options?: object) => void,
) => {
  return (article: Article) => {
    if (!article) return;

    const slug = createSlug(article.title);

    navigate(`/chi-tiet-bai-viet/${article._id}/${slug}`, {
      state: { article },
    });
  };
};
