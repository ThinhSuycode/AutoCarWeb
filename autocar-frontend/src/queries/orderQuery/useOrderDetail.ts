import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { orderService } from "../../services/order.service";
import type { OrderResponse } from "../../types/order/order.response";

export const useOrderDetail = (id: string) => {
  return useQuery<OrderResponse>({
    queryKey: queryKeys.order.detail(id),
    queryFn: () => orderService.getById(id),
  });
};
