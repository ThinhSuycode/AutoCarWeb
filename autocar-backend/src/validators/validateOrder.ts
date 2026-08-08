import { orderSchema, updateOrderSchema, updateOrderStatusSchema } from "../schemas/order.schema";
import { AppError } from "../utils/AppError";

export const validateCreateOrder = (data: unknown) => {
  const result = orderSchema.safeParse(data);

  if (!result.success) {
    throw new AppError(result.error.issues[0].message, 400);
  }

  return result.data;
};
export const validateUpdateOrder = (data: unknown) => {
  const result = updateOrderSchema.safeParse(data);

  if (!result.success) {
    throw new AppError(result.error.issues[0].message, 400);
  }

  return result.data;
};
export const validateUpdateOrderStatus = (data: unknown) => {
  const result = updateOrderStatusSchema.safeParse(data);

  if (!result.success) {
    throw new AppError(result.error.issues[0].message, 400);
  }

  return result.data;
};
