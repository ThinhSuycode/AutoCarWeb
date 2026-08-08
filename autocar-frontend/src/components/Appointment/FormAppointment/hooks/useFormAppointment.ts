import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  appointmentSchema,
  type AppointmentFormData,
} from "../../../../schemas/appointment";
import { APPOINTMENT_FORM_DEFAULT } from "../constant/appointmentData";
import { useCreateAppointmentMutation } from "../mutations/useCreateAppointmentMutation";
import { useGetCars } from "../../../../queries/useCarAllQuery";
import type { Contact } from "../../../../types/contact/contact.type";

interface Props {
  contact: Contact;
  onClose: () => void;
}

export const useFormAppointment = ({ contact, onClose }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: APPOINTMENT_FORM_DEFAULT,
  });

  const activeType = watch("appointmentType");

  const { mutateAsync, isPending } = useCreateAppointmentMutation();
  const { data: cars } = useGetCars();
  const carData = cars?.data ?? [];

  const onSubmit = useCallback(
    async (data: AppointmentFormData) => {
      try {
        await mutateAsync({
          contactId: contact._id,
          data,
        });
        reset();
        onClose();
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Lỗi khi tạo lịch hẹn!");
      }
    },
    [contact, mutateAsync, reset, onClose],
  );

  return {
    handleSubmit,
    register,
    setValue,
    errors,
    isPending,
    onSubmit,
    activeType,
    carData,
  };
};
