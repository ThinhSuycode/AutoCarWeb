export const ARTICLE_CATEGORIES = [
  {
    value: "news",
    label: "Tin tức",
  },
  {
    value: "car-review",
    label: "Đánh giá xe",
  },
  {
    value: "experience",
    label: "Kinh nghiệm",
  },
  {
    value: "maintenance",
    label: "Bảo dưỡng",
  },
  {
    value: "electric-car",
    label: "Xe điện",
  },
  {
    value: "market",
    label: "Thị trường",
  },
] as const;

export const ARTICLE_CATEGORY_VALUES = ARTICLE_CATEGORIES.map(
  (item) => item.value,
);

export type ArticleCategory = (typeof ARTICLE_CATEGORY_VALUES)[number];

export type ArticleCategoryItem = (typeof ARTICLE_CATEGORIES)[number];
