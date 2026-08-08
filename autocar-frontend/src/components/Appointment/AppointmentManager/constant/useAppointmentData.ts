export const STATUS_LABEL = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export const SERVICES_LABEL: Record<string, string> = {
  test_drive: "Lái thử xe",
  consultation: "Tư vấn",
  maintenance: "Bảo dưỡng",
  inspection: "Kiểm định",
};

export type OrderModeType = "create" | "detail" | "";
