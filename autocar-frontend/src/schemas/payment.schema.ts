import z from "zod";

import { PAYMENT_METHOD } from "../types/order/order.constant";
import { PAYMENT_STATUS } from "../types/payment/payment.constant";

export const paymentFormSchema = z.object({
  amount: z
    .number({
      message: "Vui lòng nhập số tiền thanh toán",
    })
    .positive("Số tiền phải lớn hơn 0"),

  method: z.enum(PAYMENT_METHOD).default("cash"),

  note: z.string().trim().max(500, "Ghi chú tối đa 500 ký tự").optional(),
});

export const UpdateStatusSchema = z.object({
  status: z.enum(PAYMENT_STATUS),
});

export const paymentQuerySchema = z.object({
  page: z.number().int().min(1).default(1).optional(),

  limit: z.number().int().min(1).max(100).default(10).optional(),
  orderId: z.string().optional(),

  status: z.enum(PAYMENT_STATUS).optional(),

  method: z.enum(PAYMENT_METHOD).optional(),
});

export type CreatePaymentInput = z.input<typeof paymentFormSchema>;

export type CreatePaymentOutput = z.output<typeof paymentFormSchema>;

export type CreatePaymentDto = CreatePaymentInput & {
  orderId: string;
  // transactionCode?: string;
  // createdBy?: string;
};

export type UpdateStatusPayment = z.infer<typeof UpdateStatusSchema>;

export type PaymentQuery = z.infer<typeof paymentQuerySchema>;
