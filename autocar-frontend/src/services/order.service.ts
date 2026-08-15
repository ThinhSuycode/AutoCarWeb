import type { OrderForm, UpdateOrderDto } from "../schemas/order.schema";
import type { OrderResponse } from "../types/order/order.response";
import { callApi, changeApi } from "./api";

export const orderService = {
  create: (data: OrderForm) => {
    return changeApi.request<OrderForm>("orders", "add", data);
  },

  //   getAll: (page = 1, limit = 10, status?: string) =>
  //     axiosClient
  //       .get("/orders", { params: { page, limit, status } })
  //       .then((res) => res.data),

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

  delete: (id: string) => changeApi.request("orders", "delete", undefined, id),
};
