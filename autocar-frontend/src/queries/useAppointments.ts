import { useQuery } from "@tanstack/react-query";

import { appointmentServices } from "../services/appointment.service";
import { queryKeys } from "./queryKeys";

interface AppointmentParams {
  search: string;
  status: string;
  sort?: string;
  page: number;
  limit: number;
}

const useAppointments = ({
  page,
  limit,
  search,
  status,
  sort,
}: AppointmentParams) => {
  return useQuery({
    queryKey: queryKeys.appointment.list({
      page,
      limit,
      search,
      status,
      sort,
    }),
    queryFn: () =>
      appointmentServices.getAll({
        page,
        limit,
        search,
        status,
        sort,
      }),
  });
};

export default useAppointments;
