import FilterOptions from "../../../data/FilterOptions";
import type { BrandsType } from "../../../types/car/car-filter.type";
import type { OptionType } from "../../../types/common/option.type";

// ─── Banner Stats ─────────────────────────────────────────────────────────────
export const getBannerStats = (carCount: number) => [
  {
    icon: "fa-solid fa-check-to-slot",
    heading: "100%",
    desc: "Xe đã được kiểm định",
  },
  {
    icon: "fa-regular fa-credit-card",
    heading: "Hỗ trợ trả góp 80%",
    desc: "Hỗ trợ vay ngân hàng",
  },
  {
    icon: "fa-solid fa-check-to-slot",
    heading: `${carCount}+`,
    desc: "Xe đã có sẵn",
  },
  {
    icon: "fa-regular fa-headphones",
    heading: "24/7",
    desc: "Hỗ trợ tư vấn",
  },
];

// ─── Why Choose Items ─────────────────────────────────────────────────────────
export const WHY_CHOOSE_ITEMS = [
  {
    icon: "fa-solid fa-user-shield",
    title: "Bảo Hành Chính Hãng",
    desc: "Tất cả xe đều được bảo hành theo tiêu chuẩn chính hãng",
  },
  {
    icon: "fa-solid fa-calendar-check",
    title: "Kiểm Định 150 Điểm",
    desc: "Quy trình kiểm tra nghiêm ngặt đảm bảo chất lượng xe",
  },
  {
    icon: "fa-solid fa-dollar-sign",
    title: "Hỗ Trợ Trả Góp",
    desc: "Vay lên đến 80% giá trị xe với lãi suất ưu đãi",
  },
  {
    icon: "fa-solid fa-arrow-right-arrow-left",
    title: "Đổi Trả Trong 7 Ngày",
    desc: "Cam kết đổi trả nếu phát hiện lỗi trong 7 ngày đầu",
  },
];

// ─── Price Range Map ──────────────────────────────────────────────────────────
export const PRICE_RANGES_MAP: Record<
  string,
  { priceMin: string; priceMax: string }
> = {
  "Dưới 500 triệu": { priceMin: "0", priceMax: "500000000" },
  "500 - 800 triệu": { priceMin: "500000000", priceMax: "800000000" },
  "800 triệu - 1.2 tỷ": { priceMin: "800000000", priceMax: "1200000000" },
  "Trên 1.2 tỷ": { priceMin: "1200000000", priceMax: "" },
};

// ─── Year Range Map ───────────────────────────────────────────────────────────
export const YEAR_RANGES_MAP: Record<
  string,
  { yearMin?: string; yearMax?: string }
> = {
  "2024": { yearMin: "2024", yearMax: "2024" },
  "2023": { yearMin: "2023", yearMax: "2023" },
  "2022": { yearMin: "2022", yearMax: "2022" },
  "2021": { yearMin: "2021", yearMax: "2021" },
  "2020": { yearMin: "2020", yearMax: "2020" },
  "Trước 2020": { yearMax: "2019" },
};

export const DEFAULT_SORT = { sort: "createdAt", order: "desc" };

// ─── Filter Selects ───────────────────────────────────────────────────────────
export const FILTER_SELECTS = [
  {
    name: "companyFilter",
    field: "brand" as const,
    options: FilterOptions.brands.map((b: BrandsType) => ({
      value: b.value,
      label: b.title,
    })),
  },
  {
    name: "priceFilter",
    field: "priceRanges" as const,
    options: FilterOptions.priceRanges.map((p: OptionType) => ({
      value: p.label,
      label: p.label,
    })),
  },
  {
    name: "yearFilter",
    field: "yearRanges" as const,
    options: FilterOptions.years.map((y: OptionType) => ({
      value: y,
      label: String(y),
    })),
  },
  {
    name: "transmissionFilter",
    field: "transmission" as const,
    options: FilterOptions.transmissions.map((t: OptionType) => ({
      value: t,
      label: t,
    })),
  },
];
