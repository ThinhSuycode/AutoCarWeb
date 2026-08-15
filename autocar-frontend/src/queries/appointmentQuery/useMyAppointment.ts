import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { appointmentServices } from "../../services/appointment.service";
import type { Appointment } from "../../types/appointment/appointment.type";

const useMyAppointment = () => {
  return useQuery<Appointment[]>({
    queryKey: queryKeys.appointment.myAppointment,
    queryFn: appointmentServices.getMyAppointment,
  });
};

export default useMyAppointment;
