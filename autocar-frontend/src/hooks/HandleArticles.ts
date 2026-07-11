import type { Articles } from "../types/articles";
import { createSlug } from "../utils/slug";

export const createHandleReadArticle = (
  navigate: (path: string, options?: object) => void,
) => {
  return (article: Articles) => {
    if (!article) return;

    const slug = createSlug(article.title);

    navigate(`/chi-tiet-bai-viet/${article._id}/${slug}`, {
      state: { article },
    });
  };
};
