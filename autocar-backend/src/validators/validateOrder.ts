import {
  orderSchema,
  updateOrderSchema,
  updateOrderStatusSchema,
} from "../schemas/order.schema";
import { validateWithSchema } from "../utils/validateWithSchema";

export const validateCreateOrder = (data: unknown) =>
  validateWithSchema(orderSchema, data);
export const validateUpdateOrder = (data: unknown) =>
  validateWithSchema(updateOrderSchema, data);
export const validateUpdateOrderStatus = (data: unknown) =>
  validateWithSchema(updateOrderStatusSchema, data);
