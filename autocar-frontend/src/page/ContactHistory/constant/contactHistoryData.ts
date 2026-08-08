import type { ContactStatus } from "../../../types/contact/contact.constant";

export const CONTACT_STATUS_MAP: Record<
  ContactStatus,
  {
    label: string;
    icon: string;
    className: string;
  }
> = {
  new: {
    label: "Yêu cầu mới",
    icon: "fa-envelope",
    className: "new",
  },

  assigned: {
    label: "Đã phân công",
    icon: "fa-user-check",
    className: "assigned",
  },

  contacted: {
    label: "Đã liên hệ",
    icon: "fa-phone",
    className: "contacted",
  },

  appointment_created: {
    label: "Đã tạo lịch hẹn",
    icon: "fa-calendar-check",
    className: "appointment_created",
  },

  completed: {
    label: "Hoàn thành",
    icon: "fa-circle-check",
    className: "completed",
  },

  cancelled: {
    label: "Đã hủy",
    icon: "fa-ban",
    className: "cancelled",
  },
};
