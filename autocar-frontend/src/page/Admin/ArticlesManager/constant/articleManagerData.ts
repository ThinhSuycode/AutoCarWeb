import type { Articles } from "../../../../types/articles";

export const STATUS_OPTIONS: {
  value: Articles["status"] | "all";
  label: string;
}[] = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "pending", label: "Chờ duyệt" },
  { value: "published", label: "Đã đăng" },
  { value: "draft", label: "Bản nháp" },
  { value: "archived", label: "Lưu trữ" },
];
