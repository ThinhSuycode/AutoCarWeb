export const STATUS_MAP: Record<string, { label: string; className: string }> =
  {
    published: {
      label: "Đã đăng",
      className: "published",
    },
    pending: {
      label: "Chờ duyệt",
      className: "pending",
    },
    draft: {
      label: "Bản nháp",
      className: "draft",
    },
    archived: {
      label: "Đã lưu trữ",
      className: "archived",
    },
  } as const;

export type ArticleStatus = "draft" | "pending" | "published" | "archived";

export type ArticleStatusStaff = "draft" | "pending";

export const STAFF_STATUS_ARTICILE = ["draft", "pending"];

export const STATUS_MAP_STAFF: Record<
  ArticleStatusStaff,
  { label: string; className: string }
> = {
  pending: {
    label: "Chờ duyệt",
    className: "pending",
  },
  draft: {
    label: "Bản nháp",
    className: "draft",
  },
} as const;
