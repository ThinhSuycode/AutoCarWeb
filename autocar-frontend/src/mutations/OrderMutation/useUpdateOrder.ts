import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import type { UpdateOrderDto } from "../../schemas/order.schema";
import { queryKeys } from "../../queries/queryKeys";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderDto }) =>
      orderService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.order.all });
    },
  });
};
