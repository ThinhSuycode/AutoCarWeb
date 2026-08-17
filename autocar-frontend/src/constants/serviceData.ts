export const serviceAppointment = [
  {
    id: "test_drive",
    label: "Lái thử xe",
  },
  {
    id: "consultation",
    label: "Tư vấn",
  },
  {
    id: "maintenance",
    label: "Bảo dưỡng",
  },
  {
    id: "inspection",
    label: "Kiểm định",
  },
] as const;

export type ServiceAppointmentKey = (typeof serviceAppointment)[number]["id"];
export type ServiceAppointmentType = (typeof serviceAppointment)[number];

export const SERVICE_LABEL: Record<string, string> = {
  test_drive: "Lái thử xe",
  consultation: "Tư vấn",
  maintenance: "Bảo dưỡng",
  inspection: "Kiểm định",
};

export const SERVICE_ICON: Record<string, string> = {
  test_drive: "fa-car-side",
  consultation: "fa-comments",
  maintenance: "fa-wrench",
  inspection: "fa-clipboard-check",
};

export const serviceAppointmentId = serviceAppointment.map((item) => item.id);
