export const CONTACT_STATUS = [
  "new",
  "assigned",
  "contacted",
  "appointment_created",
  "completed",
  "cancelled",
] as const;

export type ContactStatus = (typeof CONTACT_STATUS)[number];
