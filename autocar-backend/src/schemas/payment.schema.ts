import z from "zod";
import { PAYMENT_METHOD } from "../constants/orderStatus";
import { PAYMENT_STATUS } from "../constants/paymentStatus";

export const paymentFormSchema = z.object({
  orderId: z.string().min(1, "Thiếu mã ID đơn hàng"),
  amount: z.coerce.number().positive("Số tiền phải lớn hơn 0"),
  method: z.enum(PAYMENT_METHOD).default("installment"),
  status: z.enum(PAYMENT_STATUS).default("pending"),
  note: z.string().trim().max(500).optional(),
});

export const UpdateStatusSchema = z.object({
  status: z.enum(PAYMENT_STATUS),
});

export const paymentQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  orderId: z.string().optional(),
  status: z.enum(PAYMENT_STATUS).optional(),
  method: z.enum(PAYMENT_METHOD).optional(),
});

export type CreatePaymentInput = z.infer<typeof paymentFormSchema>;

export type CreatePaymentDto = CreatePaymentInput & {
  transactionCode: string;
  createdBy: string;
};

export type UpdateStatusPayment = z.infer<typeof UpdateStatusSchema>;
export type PaymentQuery = z.infer<typeof paymentQuerySchema>;
