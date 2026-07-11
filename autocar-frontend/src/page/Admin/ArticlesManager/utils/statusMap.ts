import type { Articles } from "../../../../types/articles";

export const STATUS_CONFIG: Record<
  Articles["status"],
  {
    label: string;
    className: string;
    actions: { value: Articles["status"]; label: string }[];
  }
> = {
  pending: {
    label: "Chờ duyệt",
    className: "pending",
    actions: [
      { value: "published", label: "Duyệt đăng" },
      { value: "draft", label: "Trả về nháp" },
    ],
  },
  published: {
    label: "Đã đăng",
    className: "published",
    actions: [
      { value: "archived", label: "Lưu trữ" },
      { value: "draft", label: "Ẩn bài" },
    ],
  },
  draft: {
    label: "Bản nháp",
    className: "draft",
    actions: [
      { value: "published", label: "Đăng ngay" },
      { value: "archived", label: "Lưu trữ" },
    ],
  },
  archived: {
    label: "Lưu trữ",
    className: "archived",
    actions: [
      { value: "published", label: "Đăng lại" },
      { value: "draft", label: "Về nháp" },
    ],
  },
};
