import type { ManagerStatus } from "../../../../types/managerStaff";

export const MANAGER_STATUS_OPTIONS: {
  value: ManagerStatus | "all";
  label: string;
}[] = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xác nhận" },
  { value: "received", label: "Đã tiếp nhận" },
  { value: "maintenance", label: "Bảo dưỡng" },
  { value: "ready", label: "Sẵn sàng" },
  { value: "completed", label: "Hoàn thành" },
];
