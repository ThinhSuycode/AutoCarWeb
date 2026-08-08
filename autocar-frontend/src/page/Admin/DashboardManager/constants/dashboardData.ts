export const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  pending: { label: "Chờ xác nhận", cls: "pending" },
  confirmed: { label: "Đã xác nhận", cls: "confirmed" },
  completed: { label: "Hoàn thành", cls: "completed" },
  cancelled: { label: "Đã huỷ", cls: "cancelled" },
};
