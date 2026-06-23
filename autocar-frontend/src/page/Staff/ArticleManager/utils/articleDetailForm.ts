import type { ArticleSection } from "../../../../types/articles";

export const contentToDisplay = (content: ArticleSection["content"]): string =>
  Array.isArray(content) ? content.join("\n") : (content ?? "");

export const displayToContent = (
  raw: string,
  sectionType: string,
): string | string[] => (sectionType === "list" ? raw.split("\n") : raw);

export const cleanListContent = (
  content: ArticleSection["content"],
): string[] =>
  Array.isArray(content) ? content.map((s) => s.trim()).filter(Boolean) : [];

/** Convert tags array → string hiển thị trong input ("tag1, tag2") */
export const tagsToDisplay = (tags: string[] = []): string => tags.join(", ");

/** Convert input text → tags array, tách bằng dấu phẩy */
export const displayToTags = (raw: string): string[] =>
  raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const SECTION_TYPES = [
  { value: "paragraph", label: "Đoạn văn", icon: "fa-align-left" },
  { value: "heading", label: "Tiêu đề", icon: "fa-heading" },
  { value: "image", label: "Hình ảnh", icon: "fa-image" },
  { value: "quote", label: "Trích dẫn", icon: "fa-quote-left" },
  { value: "list", label: "Danh sách", icon: "fa-list" },
] as const;

export const getSectionIcon = (type: string): string =>
  SECTION_TYPES.find((t) => t.value === type)?.icon ?? "fa-align-left";

export const getSectionLabel = (type: string): string =>
  SECTION_TYPES.find((t) => t.value === type)?.label ?? type;

/** Placeholder + số dòng textarea theo loại section */
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
