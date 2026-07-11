export const SECTION_TYPES = [
  {
    value: "paragraph",
    label: "Đoạn văn",
    icon: "fa-align-left",
    badgeClass: "paragraph",
  },
  {
    value: "heading",
    label: "Tiêu đề",
    icon: "fa-heading",
    badgeClass: "heading",
  },
  { value: "image", label: "Hình ảnh", icon: "fa-image", badgeClass: "image" },
  {
    value: "quote",
    label: "Trích dẫn",
    icon: "fa-quote-left",
    badgeClass: "quote",
  },
  { value: "list", label: "Danh sách", icon: "fa-list", badgeClass: "list" },
  {
    value: "video",
    label: "Video",
    icon: "fa-circle-play",
    badgeClass: "video",
  },
  { value: "code", label: "Code", icon: "fa-code", badgeClass: "code" },
] as const;

export type SectionTypeValue = (typeof SECTION_TYPES)[number]["value"];

const findType = (type: string) => SECTION_TYPES.find((t) => t.value === type);

export const getSectionIcon = (type: string) =>
  findType(type)?.icon ?? "fa-align-left";
export const getSectionLabel = (type: string) => findType(type)?.label ?? type;
export const getSectionBadge = (type: string) =>
  findType(type)?.badgeClass ?? type;

export const getContentFieldConfig = (sectionType: string) => {
  switch (sectionType) {
    case "quote":
      return {
        label: "Nội dung trích dẫn",
        placeholder: "Nhập trích dẫn...",
        rows: 3,
      };
    case "list":
      return {
        label: "Nội dung (mỗi dòng 1 mục)",
        placeholder: "Mục 1\nMục 2\nMục 3",
        rows: 6,
      };
    case "code":
      return { label: "Code", placeholder: "Dán code vào đây...", rows: 8 };
    default:
      return { label: "Nội dung", placeholder: "Nhập nội dung...", rows: 5 };
  }
};

export const STATUS_LABEL: Record<string, string> = {
  published: "Đã đăng",
  draft: "Bản nháp",
  pending: "Chờ duyệt",
  archived: "Lưu trữ",
};
