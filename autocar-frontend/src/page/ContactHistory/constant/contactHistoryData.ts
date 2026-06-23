export type ContactStatus = "pending" | "contacted" | "done" | "cancelled";

export const CONTACT_STATUS_MAP: Record<
  ContactStatus,
  { label: string; icon: string; className: string }
> = {
  pending: { label: "Chờ xử lý", icon: "fa-clock", className: "pending" },
  contacted: { label: "Đã liên hệ", icon: "fa-phone", className: "contacted" },
  done: { label: "Hoàn thành", icon: "fa-circle-check", className: "done" },
  cancelled: { label: "Đã huỷ", icon: "fa-ban", className: "cancelled" },
};
