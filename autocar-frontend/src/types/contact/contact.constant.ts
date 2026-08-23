export const CONTACT_STATUS = [
  "new",
  "assigned",
  "contacted",
  "appointment_created",
  "completed",
  "cancelled",
] as const;

export type ContactStatus = (typeof CONTACT_STATUS)[number];

export const CONTACT_STATUS_LABEL: Record<string, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  appointment_created: "Đã hẹn lịch",
  assigned: "Đã phân công",
  completed: "Hoàn thành",
  cancelled: "Đã huỷ",
};

export const CONTACT_STATUS_COLOR: Record<string, string> = {
  new: "#f59e0b",
  contacted: "#3b82f6",
  appointment_created: "#7c3aed",
  assigned: "#0ea5e9",
  completed: "#16a34a",
  cancelled: "#ef4444",
};
