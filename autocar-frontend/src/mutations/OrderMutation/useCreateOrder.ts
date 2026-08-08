import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import type { OrderForm } from "../../schemas/order.schema";
import toast from "react-hot-toast";
import { queryKeys } from "../../queries/queryKeys";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderForm) => orderService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.order.all });
      toast.success("Tạo đơn hàng thành công");
    },
  });
};
