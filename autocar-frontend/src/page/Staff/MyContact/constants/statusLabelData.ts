import type { UpdateContactStatusPayload } from "../../../../types/contact";

export const STATUS_LABEL: Record<string, string> = {
  pending: "Chờ xử lý",
  contacted: "Đã liên hệ",
  done: "Hoàn thành",
  cancelled: "Đã huỷ",
};
export type MAP_STATUS_CONTACT = "pending" | "contacted" | "done" | "cancelled";
export const MAP_STATUS_DATA = ["pending", "contacted", "done", "cancelled"];

export const NEXT_STATUS_CONTACT: Partial<
  Record<MAP_STATUS_CONTACT, MAP_STATUS_CONTACT>
> = {
  pending: "contacted",
  contacted: "done",
  done: "cancelled",
};
