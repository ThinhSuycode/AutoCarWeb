import React, { useState } from "react";
// import { SlidersHorizontalIcon, XIcon } from 'lucide-react'
type FilterBarProps = {
  onFilterChange?: (filters: FilterState) => void;
};
type FilterState = {
  brand: string;
  priceRange: string;
  year: string;
  transmission: string;
};
const brands = [
  "Tất cả",
  "Toyota",
  "Honda",
  "Mazda",
  "Hyundai",
  "Ford",
  "Mercedes",
  "BMW",
];
const priceRanges = [
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
const years = ["Tất cả", "2024", "2023", "2022", "2021", "2020", "Trước 2020"];
const transmissions = ["Tất cả", "Số tự động", "Số sàn"];
export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    brand: "",
    priceRange: "",
    year: "",
    transmission: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === "Tất cả" || value === "Tất cả giá" ? "" : value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };
  const clearFilters = () => {
    const clearedFilters = {
      brand: "",
      priceRange: "",
      year: "",
      transmission: "",
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };
  const hasActiveFilters = Object.values(filters).some((v) => v !== "");
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Toggle */}
        <div className="flex items-center justify-between py-4 lg:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-slate-700 font-medium"
          >
            {/* <SlidersHorizontalIcon className="w-5 h-5" /> */}
            Bộ lọc
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {Object.values(filters).filter((v) => v !== "").length}
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 font-medium hover:text-red-700"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div
          className={`${isExpanded ? "block" : "hidden"} lg:block pb-4 lg:py-4`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Brand Filter */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 lg:hidden">
                Hãng xe
              </label>
              <select
                value={filters.brand || "Tất cả"}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand === "Tất cả" ? "Hãng xe" : brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 lg:hidden">
                Khoảng giá
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 lg:hidden">
                Năm sản xuất
              </label>
              <select
                value={filters.year || "Tất cả"}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === "Tất cả" ? "Năm SX" : year}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmission Filter */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 lg:hidden">
                Hộp số
              </label>
              <select
                value={filters.transmission || "Tất cả"}
                onChange={(e) =>
                  handleFilterChange("transmission", e.target.value)
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
              >
                {transmissions.map((trans) => (
                  <option key={trans} value={trans}>
                    {trans === "Tất cả" ? "Hộp số" : trans}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters - Desktop */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2.5 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
              >
                {/* <XIcon className="w-4 h-4" /> */}
                Xóa lọc
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
