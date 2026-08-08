import type { ContactStatus } from "../../../../types/contact/contact.constant";

export const NEXT_STATUS: Record<ContactStatus, ContactStatus[]> = {
  new: [],

  assigned: ["contacted"],

  contacted: ["appointment_created", "cancelled"],

  appointment_created: ["completed", "cancelled"],

  completed: [],

  cancelled: [],
};
