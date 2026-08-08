export const APPOINTMENT_STATUS = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUS)[number];
