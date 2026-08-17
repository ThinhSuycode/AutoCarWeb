import { useCallback, useEffect, useState } from "react";
import type { OrderPaymentMode } from "../../../../constant/orderData";
import type { OrderType } from "../../../../../../types/order/order.type";

import {
  orderSchema,
  type CreateOrderInput,
  type CreateOrderOutput,
  type UpdateOrderDto,
} from "../../../../../../schemas/order.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useUpdateOrder } from "../../../../../../mutations/OrderMutation/useUpdateOrder";
import toast from "react-hot-toast";

interface Props {
  order: OrderType;
}

const useOrderPaymentForm = ({ order }: Props) => {
  const [orderPaymentMode, setOrderPaymentMode] =
    useState<OrderPaymentMode>("detail");
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrderInput, any, CreateOrderOutput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      salePrice: order.salePrice,
      taxRate: order.taxRate,
      discount: order.discount,
      note: order.note,
    },
  });

  const { mutateAsync: updateOrderMutations, isPending } = useUpdateOrder();

  const salePrice = watch("salePrice");
  const taxRate = watch("taxRate");
  const discount = watch("discount");

  const onSubmitSave = useCallback(
    async (data: UpdateOrderDto) => {
      try {
        const updated = await updateOrderMutations({
          id: order._id,
          data,
        });

        setOrderPaymentMode("detail");

        reset({
          salePrice: updated.salePrice,
          taxRate: updated.taxRate,
          discount: updated.discount,
          note: updated.note ?? "",
        });

        toast.success("Cập nhật đơn hàng thành công!");
      } catch (error: any) {
        const message = error?.response?.data?.message;

        toast.error(message || "Không lưu được dữ liệu!");
      }
    },
    [order._id, updateOrderMutations, reset],
  );

  useEffect(() => {
    reset({
      salePrice: order.salePrice,
      taxRate: order.taxRate,
      discount: order.discount,
      note: order.note,
    });
  }, [order, reset]);

  return {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    errors,

    salePrice,
    taxRate,
    discount,

    // payment mode
    orderPaymentMode,
    setOrderPaymentMode,
    // submit
    onSubmitSave,

    // loading
    isPending,
  };
};

export default useOrderPaymentForm;
