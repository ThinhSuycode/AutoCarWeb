import type { ManagerStatus } from "../car/car.constant";
import type { CarType } from "../car/car.type";

export interface ManagerCar extends CarType {
  managerStatus: ManagerStatus;
  carCount?: number;
}
export const MANAGER_STATUS_LABEL: Record<string, string> = {
  pending: "Chờ tiếp nhận",
  received: "Đã tiếp nhận",
  maintenance: "Đang kiểm định",
  ready: "Sẵn sàng bán",
  completed: "Hoàn tất",
};

export const MANAGER_STATUS_COLOR: Record<string, string> = {
  pending: "#f59e0b",
  received: "#3b82f6",
  maintenance: "#f97316",
  ready: "#0ea5e9",
  completed: "#16a34a",
};
