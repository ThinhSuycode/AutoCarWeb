export const ORDER_STATUS = [
  "pending",
  "confirmed",
  "processing",
  "ready_for_delivery",
  "completed",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUS)[number];

export const PAYMENT_METHOD = ["cash", "bank_transfer", "installment"] as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[number];
