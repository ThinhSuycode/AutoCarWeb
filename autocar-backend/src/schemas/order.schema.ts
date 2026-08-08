import { z } from "zod";
import { ORDER_STATUS, PAYMENT_METHOD } from "../models/order.model";

export const orderSchema = z.object({
  buyerId: z.string().min(1, "Khách hàng là bắt buộc"),

  carId: z.string().min(1, "Xe là bắt buộc"),

  appointmentId: z.string().optional(),

  paymentMethod: z.enum(PAYMENT_METHOD, {
    message: "Vui lòng chọn phương thức thanh toán",
  }),

  salePrice: z.coerce.number().positive("Giá bán phải lớn hơn 0"),

  taxRate: z.coerce
    .number()
    .min(0, "VAT không hợp lệ")
    .max(100, "VAT không được vượt quá 100%")
    .default(10),

  deposit: z.coerce.number().min(0, "Tiền cọc không hợp lệ").default(0),

  note: z.string().trim().max(500, "Ghi chú tối đa 500 ký tự").optional(),
});

export type CreateOrderDto = z.infer<typeof orderSchema>;

// ==========================
// UPDATE INFO
// ==========================

export const updateOrderSchema = z.object({
  paymentMethod: z.enum(PAYMENT_METHOD).optional(),

  salePrice: z.coerce.number().positive("Giá bán phải lớn hơn 0").optional(),

  taxRate: z.coerce.number().min(0).max(100).optional(),

  deposit: z.coerce.number().min(0).optional(),

  note: z.string().trim().max(500).optional(),
});

export type UpdateOrderDto = z.infer<typeof updateOrderSchema>;

export const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUS),
});

export type UpdateOrderStatusDto = z.infer<typeof updateOrderStatusSchema>;

export type OrderStatus = (typeof ORDER_STATUS)[number];

export type PaymentMethod = (typeof PAYMENT_METHOD)[number];
