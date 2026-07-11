import type { Contact } from "../../../../types/contact";

export const contactStatistics = (contacts: Contact[]) => {
  return {
    total: contacts.length,

    new: contacts.filter((c) => c.status === "new").length,

    assigned: contacts.filter((c) => c.status === "assigned").length,

    contacted: contacts.filter((c) => c.status === "contacted").length,

    appointment_created: contacts.filter(
      (c) => c.status === "appointment_created",
    ).length,

    completed: contacts.filter((c) => c.status === "completed").length,

    cancelled: contacts.filter((c) => c.status === "cancelled").length,
  };
};

export type StaticsType = ReturnType<typeof contactStatistics>;
