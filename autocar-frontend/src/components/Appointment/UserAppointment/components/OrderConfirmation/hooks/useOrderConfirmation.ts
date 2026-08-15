import { useCallback } from "react";
import useOrderConfirmed from "../../../../../../mutations/OrderMutation/useConfirmOrder";
import { useOrderDetail } from "../../../../../../queries/orderQuery/useOrderDetail";
import toast from "react-hot-toast";

const useOrderConfirmation = (id: string) => {
  const { data: orderData, isLoading } = useOrderDetail(id);
  const { mutateAsync: orderConfirm, isPending } = useOrderConfirmed();
  const order = orderData?.data;
  const handleConfirm = useCallback(async () => {
    try {
      await orderConfirm({ id: order?._id ?? "" });
    } catch (error: any) {
      const message = error?.response?.data?.message;
      toast.error(message || "Lỗi cập nhật đơn hàng!!");
    }
  }, [order?._id]);
  return {
    order,
    isLoading,
    handleConfirm,
    isConfirm: isPending,
  };
};

export default useOrderConfirmation;
