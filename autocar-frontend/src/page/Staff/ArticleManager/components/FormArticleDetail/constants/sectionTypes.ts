import type { Articles } from "../../../../../../types/articles";

export const SECTION_TYPES = [
  { value: "paragraph", label: "Đoạn văn", icon: "fa-align-left" },
  { value: "heading", label: "Tiêu đề", icon: "fa-heading" },
  { value: "image", label: "Hình ảnh", icon: "fa-image" },
  { value: "quote", label: "Trích dẫn", icon: "fa-quote-left" },
  { value: "list", label: "Danh sách", icon: "fa-list" },
] as const;

export type SectionTypeValue = (typeof SECTION_TYPES)[number]["value"];

export const getSectionIcon = (type: string): string =>
  SECTION_TYPES.find((t) => t.value === type)?.icon ?? "fa-align-left";

export const getSectionLabel = (type: string): string =>
  SECTION_TYPES.find((t) => t.value === type)?.label ?? type;

/** Cấu hình hiển thị cho textarea content theo loại section */
export const getContentFieldConfig = (sectionType: string) => {
  switch (sectionType) {
    case "list":
      return {
        label: "Nội dung (mỗi dòng 1 mục)",
        placeholder: "Mục 1\nMục 2\nMục 3",
        rows: 6,
      };
    case "quote":
      return {
        label: "Nội dung",
        placeholder: "Nhập trích dẫn...",
        rows: 3,
      };
    default:
      return {
        label: "Nội dung",
        placeholder: "Nhập nội dung...",
        rows: 5,
      };
  }
};

export const STATUS_LABEL: Record<Articles["status"], string> = {
  published: "Đã đăng",
  draft: "Bản nháp",
  pending: "Chờ duyệt",
  archived: "Lưu trữ",
};
