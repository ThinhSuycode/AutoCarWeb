import type { FilterArticleType } from "../types/articles";

export const filterArticle: FilterArticleType[] = [
  {
    id: 0,
    nameVI: "Tất cả",
    nameEN: "All",
    color: "#374151", // Gray-700
    bgColor: "#F3F4F6", // Gray-100
  },
  {
    id: 1,
    nameVI: "Tin Tức Xe",
    nameEN: "CarNews",
    color: "#1D4ED8", // Blue-700
    bgColor: "#DBEAFE", // Blue-100
  },
  {
    id: 2,
    nameVI: "Tư Vấn Mua Xe",
    nameEN: "BuyingGuide",
    color: "#047857", // Green-700
    bgColor: "#D1FAE5", // Green-100
  },
  {
    id: 3,
    nameVI: "Khuyến Mãi",
    nameEN: "Promotion",
    color: "#B91C1C", // Red-700
    bgColor: "#FEE2E2", // Red-100
  },
  {
    id: 4,
    nameVI: "Bảo Dưỡng",
    nameEN: "Maintenance",
    color: "#92400E", // Amber-800
    bgColor: "#FEF3C7", // Amber-100
  },
];
