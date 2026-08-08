import type { FilterType } from "../types/assignManagerType";

export const FILTERS_ASSIGN: { label: string; value: FilterType }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Chưa phân bổ", value: "false" },
  { label: "Đã phân bổ", value: "true" },
];
