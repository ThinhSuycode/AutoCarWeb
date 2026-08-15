import { PaymentMethodType } from "./orderStatus";

export const PAYMENT_STATUS = [
  "pending",
  "completed",
  "failed",
  "refunded",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[number];
export const PAYMENT_TRANSACTION_CODE: Record<PaymentMethodType, string> = {
  cash: "CASH",
  bank_transfer: "FT",
  installment: "INS",
};

export const STATUS_PAYMENT_TRANSITIONS: Record<
  PaymentStatus,
  PaymentStatus[]
> = {
  pending: ["completed", "failed"],
  completed: ["refunded"],
  failed: ["pending"],
  refunded: [],
};

export const canChangePaymentStatus = (
  currentStatus: PaymentStatus,
  nextStatus: PaymentStatus,
) => {
  return STATUS_PAYMENT_TRANSITIONS[currentStatus].includes(nextStatus);
};

export const createTransactionCode = (method: PaymentMethodType) => {
  const transformMethod = PAYMENT_TRANSACTION_CODE[method];
  return `${transformMethod}-${Math.floor(Math.random() * 10000000)}`;
};
