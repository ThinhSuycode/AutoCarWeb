import type { Articles } from "../types/articles";
import { createSlug } from "./createSlug";

export const createHandleReadArticle = (
  navigate: (path: string, options?: object) => void,
) => {
  return (article: Articles) => {
    if (!article) return;

    const slug = createSlug(article.title);

    localStorage.setItem("articleActive", JSON.stringify(article));

    navigate(`/chi-tiet-bai-viet/${slug}`, {
      state: { article },
    });
  };
};
