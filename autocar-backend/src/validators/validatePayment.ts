import {
  paymentFormSchema,
  UpdateStatusSchema,
} from "../schemas/payment.schema";
import { validateWithSchema } from "../utils/validateWithSchema";

export const validatedCreatePayment = (data: unknown) =>
  validateWithSchema(paymentFormSchema, data);
export const validatedUpdateStatus = (data: unknown) =>
  validateWithSchema(UpdateStatusSchema, data);
