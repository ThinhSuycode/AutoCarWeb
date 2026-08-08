import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { appointmentServices } from "../../../../services/appointment.service";
import { queryKeys } from "../../../../queries/queryKeys";
import type { AppointmentFormData } from "../../../../schemas/appointment";

export const useCreateAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      contactId,
      data,
    }: {
      contactId: string;
      data: AppointmentFormData;
    }) => appointmentServices.create(contactId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointment.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", "list"],
      });

      toast.success("Tạo lịch hẹn khách hàng thành công!");
    },
  });
};
