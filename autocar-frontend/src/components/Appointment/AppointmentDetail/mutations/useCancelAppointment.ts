import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { appointmentServices } from "../../../../services/appointment.service";
import { queryKeys } from "../../../../queries/queryKeys";

const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentServices.cancel(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointment.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.appointment.myAppointment,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.appointment.all,
      });

      toast.success("Đã hủy lịch hẹn");
    },
  });
};

export default useCancelAppointment;
