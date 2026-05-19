import type { FilterOptionsType } from "../types/car";

export const FilterOptions: FilterOptionsType = {
  brands: [
    {
      id: "all",
      title: "Hãng xe",
      value: "",
    },
    {
      id: "toyota",
      title: "Toyota",
      value: "Toyota",
    },
    {
      id: "honda",
      title: "Honda",
      value: "Honda",
    },
    {
      id: "mazda",
      title: "Mazda",
      value: "Mazda",
    },
    {
      id: "hyundai",
      title: "Hyundai",
      value: "Hyundai",
    },
    {
      id: "ford",
      title: "Ford",
      value: "Ford",
    },
    {
      id: "mercedes",
      title: "Mercedes",
      value: "Mercedes",
    },
    {
      id: "bmw",
      title: "BMW",
      value: "BMW",
    },
    {
      id: "mitsubishi",
      title: "Mitsubishi",
      value: "Mitsubishi",
    },
    {
      id: "suzuki",
      title: "Suzuki",
      value: "Suzuki",
    },
    {
      id: "kia",
      title: "Kia",
      value: "Kia",
    },
    {
      id: "audi",
      title: "Audi",
      value: "Audi",
    },
    {
      id: "lexus",
      title: "Lexus",
      value: "Lexus",
    },
  ],
  priceRanges: [
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
  ],
  years: ["Tất cả", "2024", "2023", "2022", "2021", "2020", "Trước 2020"],
  bodyTypes: ["Tất cả loại", "Bán tải", "Hatchback", "MPV", "SUV", "Sedan"],
  transmissions: ["Tất cả", "Số tự động", "Số sàn"],
};
export default FilterOptions;
