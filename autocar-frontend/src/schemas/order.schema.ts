import { z } from "zod";

export const PAYMENT_METHOD = ["cash", "bank_transfer", "installment"] as const;

export const ORDER_STATUS = [
  "pending",
  "processing",
  "completed",
  "cancelled",
] as const;

export const orderSchema = z.object({
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

  status: z.enum(ORDER_STATUS).default("pending"),
});

export const orderFormSchema = orderSchema.extend({
  buyerId: z.string().min(1, "Khách hàng là bắt buộc"),

  carId: z.string().min(1, "Xe là bắt buộc"),

  appointmentId: z.string().optional(),
});

export const updateOrderSchema = orderSchema
  .pick({
    paymentMethod: true,
    salePrice: true,
    taxRate: true,
    deposit: true,
    note: true,
  })
  .partial();

export const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUS),
});

export type OrderForm = z.infer<typeof orderFormSchema>;

export type CreateOrderDto = z.infer<typeof orderSchema>;

export type UpdateOrderDto = z.infer<typeof updateOrderSchema>;

export type UpdateOrderStatusDto = z.infer<typeof updateOrderStatusSchema>;

export type CreateOrderInput = z.input<typeof orderSchema>;

export type CreateOrderOutput = z.output<typeof orderSchema>;

export type PaymentMethod = (typeof PAYMENT_METHOD)[number];

export type OrderStatus = (typeof ORDER_STATUS)[number];
