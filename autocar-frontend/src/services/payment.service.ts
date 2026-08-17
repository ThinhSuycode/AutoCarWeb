import type { CreatePaymentDto, PaymentQuery } from "../schemas/payment.schema";
import type {
  PaymentListResponse,
  PaymentResponse,
} from "../types/payment/payment.response";
import type { PaymentStatus } from "../types/payment/payment.type";
import { callApi, changeApi } from "./api";

export const paymentService = {
  all: async ({
    page = 1,
    limit = 10,
    status,
    method,
    orderId,
  }: PaymentQuery) => {
    const query = new URLSearchParams();

    query.set("page", String(page));
    query.set("limit", String(limit));

    if (status) {
      query.set("status", status);
    }
    if (method) {
      query.set("method", method);
    }
    if (orderId) {
      query.set("orderId", orderId);
    }
    const response = await callApi.getData<PaymentListResponse>(
      `/payments/getAll?${query.toString()}`,
    );
    return response;
  },
  create: async (data: CreatePaymentDto) => {
    const response = await changeApi.request<PaymentResponse>(
      "/payments",
      "add",
      data,
    );

    return response.data;
  },
  updateStatus: async (id: string, status: PaymentStatus) => {
    const res = await changeApi.request(`/payments/${id}/status`, "patch", {
      status,
    });
    return res;
  },
};
