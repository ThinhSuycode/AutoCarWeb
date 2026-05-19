import { filterArticle } from "../data/articleData";
import type { FilterArticleType } from "../types/articles";

export const getColorCategory = (title: string) => {
  if (!filterArticle) return "";
  const found = filterArticle.find(
    (item: FilterArticleType) => item.nameVI === title,
  );
  return found ? found.nameEN : "";
};
