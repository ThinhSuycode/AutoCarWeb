import type {
  PaymentStatus,
  PaymentType,
} from "../../../../../../../../types/payment/payment.type";
import useUpdateStatus from "../../../../../../../../mutations/PaymentMutation/useUpdateStatus";
import { canChangePaymentStatus } from "../../../../../../constant/paymentData";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../../../../../../../queries/userQuery/useCurrentUser";

const useHistoryCard = (payment: PaymentType) => {
  const login = !!localStorage.getItem("token");
  const { data: userData } = useCurrentUser(login);
  const { mutateAsync: updateStatusMutation, isPending } = useUpdateStatus();
  const handleUpdateStatus = async (status: PaymentStatus) => {
    try {
      const statusAllow = canChangePaymentStatus(payment.status, status);
      if (!statusAllow) {
        return toast.error(
          `Không thể chuyển đổi trạng thái ${payment.status} sang ${status}!!`,
        );
      }
      await updateStatusMutation({
        id: payment._id,
        status: status,
      });
      toast.success("Cập nhật trạng thái thành công!!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Cập nhật thất bại!!");
    }
  };
  return {
    handleUpdateStatus,
    isPending,
    userData,
  };
};

export default useHistoryCard;
