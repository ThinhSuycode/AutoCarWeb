import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { queryKeys } from "../../queries/queryKeys";
import { orderService } from "../../services/order.service";

const useConfirmOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => orderService.confirmOrder(id),

    onSuccess: (_, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries({
        queryKey: queryKeys.order.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.order.all,
      });

      toast.success("Xác nhận đơn hàng thành công!");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Xác nhận đơn hàng thất bại!",
      );
    },
  });
};

export default useConfirmOrder;
