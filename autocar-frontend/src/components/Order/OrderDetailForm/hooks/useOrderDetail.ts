import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreatePayment } from "../../../../mutations/PaymentMutation/useCreatePayment";

import {
  paymentFormSchema,
  type CreatePaymentDto,
  type CreatePaymentInput,
  type CreatePaymentOutput,
} from "../../../../schemas/payment.schema";

import type { OrderType } from "../../../../types/order/order.type";
import toast from "react-hot-toast";
import useGetAllPayment from "../../../../queries/paymentQuery/useGetAllPayment";

const useOrderDetail = (order: OrderType) => {
  const [openOrder, setOpenOrder] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreatePaymentInput, any, CreatePaymentOutput>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      amount: 0,
      method: "cash",
      note: "",
    },
  });
  const { mutateAsync: createPaymentAsync, isPending } = useCreatePayment();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data } = useGetAllPayment({ page, limit, orderId: order._id });

  const paymentMethod = watch("method") ?? null;

  const onSubmitPayment = async (data: CreatePaymentInput) => {
    try {
      const dataNew: CreatePaymentDto = {
        orderId: order._id,
        amount: data.amount,
        method: data.method,
        note: data.note,
      };
      await createPaymentAsync(dataNew);
      toast.success("Tạo hoá đơn thanh toán thành công.");
      reset();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      toast.error(message || "Lỗi khi tạo hoá đơn thanh toán!!");
    }
  };

  return {
    // modal
    openOrder,
    setOpenOrder,

    // form
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    errors,

    // values
    paymentMethod,

    // submit
    onSubmitPayment,

    // loading
    isPending,

    paymentsData: data?.data,
  };
};

export default useOrderDetail;
