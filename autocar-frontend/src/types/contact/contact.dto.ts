import type { ContactStatus } from "./contact.constant";

export interface CreateContactDto {
  name: string;

  phone: string;

  message: string;
}

export interface UpdateContactDto {
  notes?: string;

  status?: ContactStatus;
}

export interface AssignContactDto {
  managerId: string;
}
