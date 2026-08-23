import { validateWithSchema } from "../utils/validateWithSchema";
import {
  createContactSchema,
  updateContactSchema,
  type CreateContactData,
  type UpdateContactData,
} from "../schemas/contact.schema";

export const validatedCreateContact = (data: unknown): CreateContactData =>
  validateWithSchema(createContactSchema, data);

export const validatedUpdateContact = (data: unknown): UpdateContactData =>
  validateWithSchema(updateContactSchema, data);
