export const ORDER_STATUS = [
  "pending",
  "confirmed",
  "processing",
  "ready_for_delivery",
  "completed",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUS)[number];

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],

  confirmed: ["processing", "cancelled"],

  processing: ["ready_for_delivery", "cancelled"],

  ready_for_delivery: ["completed"],

  completed: [],

  cancelled: [],
};

export const canChangeOrderStatus = (
  currentStatus: OrderStatus,
  nextStatus: OrderStatus,
): boolean => {
  return ORDER_STATUS_TRANSITIONS[currentStatus].includes(nextStatus);
};

export const PAYMENT_METHOD = ["cash", "bank_transfer", "installment"] as const;

export type PaymentMethodType = (typeof PAYMENT_METHOD)[number];
