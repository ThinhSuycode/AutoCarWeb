import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { queryKeys } from "../../queries/queryKeys";
import toast from "react-hot-toast";

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderService.updateStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.order.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.order.all });
      toast.success("Cập nhật trạng thái thành công!!");
    },
  });
};
