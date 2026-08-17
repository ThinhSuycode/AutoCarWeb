import type { PaymentStatus } from "../../../types/payment/payment.type";

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending: "Đang chờ",
  completed: "Đã thanh toán",
  failed: "Thất bại",
  refunded: "Đã hoàn tiền",
};

export type PaymentMode = "create" | "edit" | "detail";

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
  statusCurrent: PaymentStatus,
  nextStatus: PaymentStatus,
) => {
  return STATUS_PAYMENT_TRANSITIONS[statusCurrent].some(
    (item) => item === nextStatus,
  );
};

export const PAYMENT_STATUS_ICON: Record<PaymentStatus, string> = {
  pending: "fa-clock",
  completed: "fa-circle-check",
  failed: "fa-circle-xmark",
  refunded: "fa-rotate-left",
};
