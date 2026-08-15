import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { appointmentServices } from "../../services/appointment.service";
import { queryKeys } from "../../queries/queryKeys";

const useConfirmAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentServices.confirm(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointment.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.appointment.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointment.myAppointment,
      });

      toast.success("Xác nhận lịch hẹn thành công");
    },
  });
};

export default useConfirmAppointment;
