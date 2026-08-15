import type { PaymentMethod } from "../order/order.constant";
import type { OrderType } from "../order/order.type";
import type { UserType } from "../user/user.type";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type PaymentType = {
  _id: string;
  orderId: OrderType;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionCode: string;
  note?: string;
  paidAt?: string;
  createdBy?: UserType;
  createdAt: string;
  updatedAt: string;
};

export type PaymentWithOrder = Omit<PaymentType, "orderId"> & {
  orderId: OrderType;
};
