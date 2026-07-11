import type { CONTACT_STATUS } from "../../../../types/contact";

export type STAFF_STATUS_CONTACT =
  | "contacted"
  | "appointment_created"
  | "completed"
  | "cancelled";

export const STATUS_LABEL: Record<CONTACT_STATUS, string> = {
  new: "Mới",

  assigned: "Đã phân công",

  contacted: "Đã liên hệ",

  appointment_created: "Đã tạo lịch hẹn",

  completed: "Hoàn thành",

  cancelled: "Đã huỷ",
};

export const MAP_STATUS_DATA: STAFF_STATUS_CONTACT[] = [
  "contacted",
  "appointment_created",
  "completed",
  "cancelled",
];
export const STAFF_FILTER_STATUS = [
  {
    value: "assigned",
    label: "Đã phân công",
  },
  {
    value: "contacted",
    label: "Đã liên hệ",
  },
  {
    value: "appointment_created",
    label: "Đã tạo lịch hẹn",
  },
  {
    value: "completed",
    label: "Hoàn thành",
  },
  {
    value: "cancelled",
    label: "Đã huỷ",
  },
];
