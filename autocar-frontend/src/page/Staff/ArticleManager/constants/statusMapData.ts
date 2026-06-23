// ─── Status map cho danh sách bài viết ───────────────────────────────────────
export const STATUS_MAP = {
  published: {
    label: "Đã đăng",
    className: "published",
  },
  draft: {
    label: "Bản nháp",
    className: "draft",
  },
} as const;
