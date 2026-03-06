import type { ArticlesItem } from "../services/data/carsData";
import { createSlug } from "./createSlug";

export const onHandleReadArticle = (article: ArticlesItem) => {
  if (!article) return;
  localStorage.setItem("articleActive", JSON.stringify(article));
  window.location.href = `/chi-tiet-bai-viet/${createSlug(article.title)}`;
};
