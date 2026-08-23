import { useUpdateStatus } from "../../../../../../mutations/OrderMutation/useUpdateStatus";
import type { OrderType } from "../../../../../../types/order/order.type";
import { getErrorMessage } from "../../../../../../utils/getErrorMessage";
import { ORDER_STATUS_TRANSITIONS } from "../../../../constant/orderData";

const useOrderFooter = (order: OrderType) => {
  const { mutateAsync: updateStatusMutation, isPending } = useUpdateStatus();
  const nextStatus =
    order?.status && ORDER_STATUS_TRANSITIONS[order.status]?.[0];
  const payPaid = Number(order?.paidAmount) - Number(order?.totalAmount);
  const paymentSuccess = payPaid !== order?.remainingAmount;
  const handleUpdateStatus = async (status: string) => {
    try {
      if (!status.trim()) return;
      await updateStatusMutation({ id: order._id, status });
    } catch (error: any) {
      getErrorMessage(error);
    }
  };
  return {
    updateLoading: isPending,
    nextStatus,
    paymentSuccess,
    handleUpdateStatus,
  };
};

export default useOrderFooter;
