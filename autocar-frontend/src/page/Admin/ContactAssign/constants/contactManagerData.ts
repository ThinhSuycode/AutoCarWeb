export const STATUS_LABEL: Record<string, string> = {
  new: "Mới",

  assigned: "Đã phân công",

  contacted: "Đã liên hệ",

  appointment_created: "Đã tạo lịch hẹn",

  completed: "Hoàn thành",

  cancelled: "Đã huỷ",
};

export const STATUS_ICON: Record<string, string> = {
  new: "fa-circle-plus",

  assigned: "fa-user-check",

  contacted: "fa-phone",

  appointment_created: "fa-calendar-check",

  completed: "fa-circle-check",

  cancelled: "fa-ban",
};

export const CONTACT_STATUS_OPTIONS = [
  {
    value: "new",
    label: "Mới",
  },
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
