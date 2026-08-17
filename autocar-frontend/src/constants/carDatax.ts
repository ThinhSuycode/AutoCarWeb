import type { PriceRangeType } from "../types/car/car-filter.type";
import type { ColorType } from "../types/car/car.constant";

export const brands = [
  {
    key: "toyota",
    label: "Toyota",
  },
  {
    key: "honda",
    label: "Honda",
  },
  {
    key: "mazda",
    label: "Mazda",
  },
  {
    key: "hyundai",
    label: "Hyundai",
  },
  {
    key: "ford",
    label: "Ford",
  },
  {
    key: "mercedes",
    label: "Mercedes-Benz",
  },
  {
    key: "bmw",
    label: "BMW",
  },
] as const;

export type BrandKey = (typeof brands)[number]["key"];

export const colors: ColorType[] = [
  {
    key: "red",
    title: "Màu đỏ",
  },
  {
    key: "yellow",
    title: "Màu vàng",
  },
  {
    key: "white",
    title: "Màu trắng",
  },
];
export const priceRanges: PriceRangeType[] = [
  {
    value: "",
    label: "Tất cả giá",
  },
  {
    value: "0-500",
    label: "Dưới 500 triệu",
  },
  {
    value: "500-800",
    label: "500 - 800 triệu",
  },
  {
    value: "800-1200",
    label: "800 triệu - 1.2 tỷ",
  },
  {
    value: "1200+",
    label: "Trên 1.2 tỷ",
  },
];

export const years: string[] = [
  "Tất cả",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "Trước 2020",
];

export const BodyTypeCar: string[] = [
  "pickup",
  "hatchback",
  "mpv",
  "suv",
  "sedan",
];
export const transmissions: string[] = ["Tất cả", "Số tự động", "Số sàn"];

export const BRAND_BODY_TYPES: Record<string, string[]> = {
  Toyota: ["sedan", "suv", "hatchback", "pickup", "mpv"],
  Honda: ["sedan", "suv", "hatchback", "mpv"],
  Mazda: ["sedan", "suv", "hatchback"],
  Hyundai: ["sedan", "suv", "hatchback", "mpv"],
  Ford: ["suv", "pickup", "hatchback"],
  Mercedes: ["sedan", "suv", "coupe", "convertible"],
  BMW: ["sedan", "suv", "coupe", "convertible"],
};

export const CarBodyType: Record<string, string> = {
  sedan: "Sedan",
  suv: "SUV",
  hatchback: "Hatchback",
  coupe: "Coupe",
  convertible: "Mui trần",
  pickup: "Bán tải",
  mpv: "MPV",
  wagon: "Station Wagon",
  van: "Van",
  crossover: "Crossover",
};

// SORT
export const sortMap: Record<string, { sort: string; order: string }> = {
  "year-max": { sort: "year", order: "desc" },
  "year-min": { sort: "year", order: "asc" },
  "price-asc": { sort: "price", order: "asc" },
  "price-desc": { sort: "price", order: "desc" },
  "km-asc": { sort: "mileage", order: "asc" },
  "km-desc": { sort: "mileage", order: "desc" },
};

export const SORT_OPTIONS = [
  { value: "year-max", label: "Năm mới nhất" },
  { value: "year-min", label: "Năm cũ nhất" },
  { value: "price-asc", label: "Giá thấp đến cao" },
  { value: "price-desc", label: "Giá cao đến thấp" },
  { value: "km-desc", label: "Nhiều Km nhất" },
  { value: "km-asc", label: "Ít Km nhất" },
] as const;

export const modeData = [
  {
    icon: "fa-solid fa-grip",
    value: "grid",
  },
  {
    icon: "fa-solid fa-list",
    value: "list",
  },
];

export type ModeDataType = (typeof modeData)[number];

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];
