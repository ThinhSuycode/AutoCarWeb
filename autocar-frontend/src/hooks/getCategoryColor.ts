import {
  ARTICLE_CATEGORIES,
  type ArticleCategoryItem,
} from "../constants/articleData";

export const getColorCategory = (title: string) => {
  if (!ARTICLE_CATEGORIES) return "";
  const found = ARTICLE_CATEGORIES.find(
    (item: ArticleCategoryItem) => item.label === title,
  );
  return found ? found.value : "";
};
export const getLabelCategory = (title: string) => {
  if (!ARTICLE_CATEGORIES) return "";
  const found = ARTICLE_CATEGORIES.find(
    (item: ArticleCategoryItem) => item.value === title,
  );
  return found ? found.label : "";
};
