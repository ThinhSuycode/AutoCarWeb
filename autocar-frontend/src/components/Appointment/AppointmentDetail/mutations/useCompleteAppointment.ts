import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { appointmentServices } from "../../../../services/appointment.service";
import { queryKeys } from "../../../../queries/queryKeys";

const useCompleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentServices.complete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointment.all,
      });
      toast.success("Hoàn thành lịch hẹn");
    },
  });
};

export default useCompleteAppointment;
