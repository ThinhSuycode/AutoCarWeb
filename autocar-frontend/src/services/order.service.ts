import type { OrderForm, UpdateOrderDto } from "../schemas/order.schema";
import type { OrderResponse } from "../types/order/order.response";
import { callApi, changeApi } from "./api";

export const orderService = {
  create: (data: OrderForm) => {
    return changeApi.request<OrderForm>("orders", "add", data);
  },

  getById: (id: string) => callApi.getData<OrderResponse>(`/orders/${id}`),

  update: (id: string, data: UpdateOrderDto) =>
    changeApi.request<UpdateOrderDto>("orders", "patch", data, id),

  confirmOrder: async (id: string) => {
    const res = await changeApi.request<OrderResponse>(
      `orders/${id}/confirmed`,
      "patch",
    );
    return res.data;
  },
  updateStatus: async (id: string, status: string) => {
    const res = await changeApi.request<OrderResponse>(
      `/orders/${id}/status`,
      "patch",
      { status },
    );
    return res.data;
  },

  delete: (id: string) => changeApi.request("orders", "delete", undefined, id),
};
