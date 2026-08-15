import {
  paymentFormSchema,
  UpdateStatusSchema,
} from "../schemas/payment.schema";
import { AppError } from "../utils/AppError";

export const validatedCreatePayment = (data: unknown) => {
  const result = paymentFormSchema.safeParse(data);
  if (!result.success) {
    throw new AppError(result.error.issues[0].message, 400);
  }
  return result.data;
};

export const validatedUpdateStatus = (data: unknown) => {
  const result = UpdateStatusSchema.safeParse(data);
  if (!result.success) {
    throw new AppError(result.error.issues[0].message, 400);
  }
  return result.data;
};
