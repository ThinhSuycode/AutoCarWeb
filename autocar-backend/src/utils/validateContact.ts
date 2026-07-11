import { contactFormSchema } from "../schemas/contact.schema";
import { AppError } from "./AppError";

export const validatedCreateContact = (data: unknown) => {
  const result = contactFormSchema.safeParse(data);
  if (!result.success) {
    const message = result.error.issues.map((err) => err.message).join(", ");
    throw new AppError(message, 400);
  }
  return result.data;
};
