import type { CONTACT_STATUS } from "../../../../types/contact";

export const NEXT_STATUS: Record<CONTACT_STATUS, CONTACT_STATUS[]> = {
  new: [],

  assigned: ["contacted"],

  contacted: ["appointment_created", "cancelled"],

  appointment_created: ["completed", "cancelled"],

  completed: [],

  cancelled: [],
};
