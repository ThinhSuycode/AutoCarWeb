import type { ManagerStatus } from "../types/managerStaff";

export const MANAGER_STATUS_MAP: Record<
  ManagerStatus,
  { label: string; className: string; icon: string }
> = {
  pending: {
    label: "Chờ xác nhận",
    className: "pending",
    icon: "fa-clock",
  },
  received: {
    label: "Đã tiếp nhận",
    className: "received",
    icon: "fa-circle-check",
  },
  maintenance: {
    label: "Đang bảo dưỡng",
    className: "maintenance",
    icon: "fa-wrench",
  },
  ready: {
    label: "Sẵn sàng",
    className: "ready",
    icon: "fa-car",
  },
  completed: {
    label: "Hoàn thành",
    className: "completed",
    icon: "fa-flag-checkered",
  },
};

export const NEXT_STATUS: Partial<Record<ManagerStatus, ManagerStatus>> = {
  pending: "received",
  received: "maintenance",
  maintenance: "ready",
  ready: "completed",
};
