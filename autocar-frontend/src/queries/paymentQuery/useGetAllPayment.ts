import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { paymentService } from "../../services/payment.service";
import type { PaymentQuery } from "../../schemas/payment.schema";

const useGetAllPayment = ({
  page,
  limit,
  orderId,
  status,
  method,
}: PaymentQuery) => {
  return useQuery({
    queryKey: queryKeys.payment.list({ page, limit, orderId, status, method }),
    queryFn: () => paymentService.all({ page, limit, orderId, status, method }),
  });
};

export default useGetAllPayment;
