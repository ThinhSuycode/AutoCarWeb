import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  orderSchema,
  type CreateOrderDto,
  type CreateOrderInput,
  type CreateOrderOutput,
} from "../../../../schemas/order.schema";
import { useCreateOrder } from "../../../../mutations/OrderMutation/useCreateOrder";
import toast from "react-hot-toast";
import type { Appointment } from "../../../../types/appointment/appointment.type";

interface Props {
  defaultValues?: Partial<CreateOrderDto>;
  appointment: Appointment;
  onClose: () => void;
}
const useOrderForm = ({ defaultValues, appointment, onClose }: Props) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateOrderInput, any, CreateOrderOutput>({
    resolver: zodResolver(orderSchema),
    defaultValues: defaultValues ?? {},
  });

  const discount = watch("discount") ? Number(watch("discount")) : 0;

  const taxRate = watch("taxRate") ? Number(watch("taxRate")) : 0;

  const salePrice = watch("salePrice") ? Number(watch("salePrice")) : 0;

  const { mutateAsync: createOrderMutation } = useCreateOrder();

  const onSubmit = async (data: CreateOrderDto) => {
    try {
      if (data.salePrice > appointment.contactId.carPrice) {
        toast.error("Giá thương lượng không được lớn hơn giá niêm yết!!");
        return;
      }
      await createOrderMutation({
        ...data,
        status: "pending",
        buyerId: appointment.contactId.buyerId?._id ?? "",

        carId: appointment.contactId.carId?._id ?? "",

        appointmentId: appointment._id,
      });
      onClose();
    } catch (error: any) {
      const message = error?.respone?.data?.message || "Lỗi khi tạo đơn hàng!!";
      toast.error(message);
    }
  };
  return {
    register,
    watch,
    setValue,
    onSubmit,
    handleSubmit,
    errors,
    salePrice,
    discount,
    taxRate,
    control,
  };
};

export default useOrderForm;
