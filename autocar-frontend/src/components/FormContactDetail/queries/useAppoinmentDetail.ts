import { useQuery } from "@tanstack/react-query";
import { appointmentServices } from "../../../services/appointment.service";
import { queryKeys } from "../../../queries/queryKeys";

export const useAppointmentDetailQuery = (contactId: string) => {
  return useQuery({
    queryKey: queryKeys.appointment.detail(contactId),
    queryFn: () => appointmentServices.getDetail(contactId),
    enabled: !!contactId,
  });
};
