export const DAYS = ["", "CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export const STATUS_META: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ duyệt", color: "#f59e0b" },
  confirmed: { label: "Xác nhận", color: "#3b82f6" },
  completed: { label: "Hoàn thành", color: "#22c55e" },
  cancelled: { label: "Huỷ bỏ", color: "#ef4444" },
};

export const getStatusMeta = (status: string) =>
  STATUS_META[status] ?? { label: status, color: "#94a3b8" };

export const formatCompact = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(n);

export const formatRevenue = (value: number) => {
  const ty = value / 1000000000;
  if (ty < 1) {
    return `${Math.round(value / 1000000).toLocaleString("vi-VN")} triệu VNĐ`;
  }
  return `${ty.toFixed(1)} tỷ VNĐ`;
};

export const formatRevenueTick = (v: number) => {
  const ty = v / 1000000000;
  if (ty < 1) return `${Math.round(v / 1000000)} tr`;
  return `${ty.toFixed(1)} tỷ`;
};
