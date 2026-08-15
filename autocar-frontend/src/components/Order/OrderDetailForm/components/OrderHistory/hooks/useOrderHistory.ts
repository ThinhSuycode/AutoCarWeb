import useGetAllPayment from "../../../../../../queries/paymentQuery/useGetAllPayment";

const useOrderHistory = (orderId?: string) => {
  const { data, isPending } = useGetAllPayment({ orderId: orderId ?? "" });
  return {
    paymentData: data?.data,
    isLoading: isPending,
  };
};

export default useOrderHistory;
