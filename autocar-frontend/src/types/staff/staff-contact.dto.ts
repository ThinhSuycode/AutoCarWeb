import type { ContactStatus } from "../contact/contact.constant";

export interface UpdateContactStatusDto {
  status: ContactStatus;

  notes?: string;
}
