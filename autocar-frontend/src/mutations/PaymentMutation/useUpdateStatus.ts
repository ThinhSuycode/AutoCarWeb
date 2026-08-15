import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../../services/payment.service";
import { queryKeys } from "../../queries/queryKeys";
import toast from "react-hot-toast";
import type { PaymentStatus } from "../../types/payment/payment.type";

const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: PaymentStatus }) =>
      paymentService.updateStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.payment.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.payment.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.order.all,
      });
    },
    onError: () => {
      toast.error("Cập nhật trạng thái lỗi!!");
    },
  });
};

export default useUpdateStatus;
