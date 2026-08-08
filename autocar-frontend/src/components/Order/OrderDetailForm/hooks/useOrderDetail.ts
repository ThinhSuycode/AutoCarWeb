import { useForm } from "react-hook-form";
import {
  orderSchema,
  type CreateOrderInput,
  type CreateOrderOutput,
  type UpdateOrderDto,
} from "../../../../schemas/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { OrderType } from "../../../../types/order/order.type";
import { useCallback, useEffect, useState } from "react";
import type { OrderPaymentMode } from "../../constant/orderData";
import toast from "react-hot-toast";
import { useUpdateOrder } from "../../../../mutations/OrderMutation/useUpdateOrder";

const useOrderDetail = (order: OrderType) => {
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
      paymentMethod: order.paymentMethod,
      salePrice: order.salePrice,
      taxRate: order.taxRate,
      deposit: order.deposit,
      note: order.note,
    },
  });
  const [paymentMode, setPaymentMode] = useState<OrderPaymentMode>("detail");

  const { mutateAsync: updateOrderMutations, isPending } = useUpdateOrder();

  const deposit = watch("deposit") ? Number(watch("deposit")) : 0;

  const taxRate = watch("taxRate") ? Number(watch("taxRate")) : 0;

  const salePrice = watch("salePrice") ? Number(watch("salePrice")) : 0;

  const paymentMethod = watch("paymentMethod");

  const note = watch("note") ?? "";

  const onSubmitSave = useCallback(
    async (data: UpdateOrderDto) => {
      try {
        const updated = await updateOrderMutations({ id: order._id, data });
        setPaymentMode("detail");
        reset({
          paymentMethod: updated.paymentMethod,
          salePrice: updated.salePrice,
          taxRate: updated.taxRate,
          deposit: updated.deposit,
          note: updated.note,
        });
        toast.success("Cập nhật thành công!!");
      } catch (error: any) {
        const message = error?.response?.data?.message;
        toast.error(message || "Không lưu được dữ liệu!!");
      }
    },
    [order._id],
  );
  useEffect(() => {
    reset({
      paymentMethod: order.paymentMethod,
      salePrice: order.salePrice,
      taxRate: order.taxRate,
      deposit: order.deposit,
      note: order.note,
    });
  }, [order, reset]);

  return {
    register,
    control,
    watch,
    errors,
    paymentMethod,
    setValue,
    paymentMode,
    setPaymentMode,
    salePrice,
    taxRate,
    handleSubmit,
    deposit,
    onSubmitSave,
    note,
    reset,
  };
};

export default useOrderDetail;
