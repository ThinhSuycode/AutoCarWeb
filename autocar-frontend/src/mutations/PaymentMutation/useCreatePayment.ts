import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../queries/queryKeys";
import type { CreatePaymentDto } from "../../schemas/payment.schema";
import { paymentService } from "../../services/payment.service";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentDto) => paymentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payment.all });
    },
  });
};
