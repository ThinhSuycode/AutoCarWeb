import type { Contact } from "../../../../types/contact";

export const statistics = (contacts: Contact[]) => {
  return {
    total: contacts.length,
    pending: contacts.filter((c) => c.status === "pending").length,
    contacted: contacts.filter((c) => c.status === "contacted").length,
    done: contacts.filter((c) => c.status === "done").length,
    cancelled: contacts.filter((c) => c.status === "cancelled").length,
  };
};

export type StaticsType = ReturnType<typeof statistics>;
