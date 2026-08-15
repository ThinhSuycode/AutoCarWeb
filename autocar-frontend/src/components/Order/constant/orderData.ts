export const ORDER_STATUS = [
  "pending",
  "confirmed",
  "processing",
  "ready_for_delivery",
  "completed",
  "cancelled",
] as const;

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],

  confirmed: ["processing", "cancelled"],

  processing: ["ready_for_delivery", "cancelled"],

  ready_for_delivery: ["completed"],

  completed: [],

  cancelled: [],
};
export type OrderStatus = (typeof ORDER_STATUS)[number];

export const PAYMENT_METHOD = ["cash", "bank_transfer", "installment"] as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[number];

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  cash: "Tiền mặt",
  bank_transfer: "Chuyển khoản",
  installment: "Trả góp",
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  processing: "Đang xử lý",
  ready_for_delivery: "Sẵn sàng giao",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export const paymentMethods = Object.entries(PAYMENT_LABEL).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export const orderStatus = Object.entries(ORDER_STATUS_LABEL).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "#f59e0b",
  confirmed: "#0ea5e9",
  processing: "#2563eb",
  ready_for_delivery: "#7c3aed",
  completed: "#16a34a",
  cancelled: "#dc2626",
};

export const PAYMENT_METHODS_DATA = [
  {
    value: "cash",
    title: "Tiền mặt",
    icon: "fa-money-bill",
  },
  {
    value: "bank_transfer",
    title: "Chuyển khoản",
    icon: "fa-building-columns",
  },
  {
    value: "installment",
    title: "Trả góp",
    icon: "fa-credit-card",
  },
] as const;

export type OrderPaymentMode = "create" | "edit" | "detail";

export type PAYMENT_METHODS_TYPE = (typeof PAYMENT_METHODS_DATA)[number];
