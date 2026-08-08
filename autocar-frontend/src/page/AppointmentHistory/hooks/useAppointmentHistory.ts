import { useCallback, useState } from "react";
import useCancelAppointment from "../../../components/Appointment/AppointmentDetail/mutations/useCancelAppointment";
import useMyAppointment from "../queries/useMyAppointment";
import type { Appointment } from "../../../types/appointment/appointment.type";

const useAppointmentHistory = () => {
  const { mutateAsync: handleCancel, isPending } = useCancelAppointment();
  const { data: appointments, isLoading } = useMyAppointment();
  const [appointmentDetail, setAppointmentDetail] =
    useState<Appointment | null>(null);
  const onHandleClose = useCallback(() => {
    if (appointmentDetail) {
      setAppointmentDetail(null);
    }
  }, [appointmentDetail]);
  return {
    handleCancel,
    isLoadingCancel: isPending,
    appointments: appointments ?? [],
    isLoading,
    appointmentDetail,
    setAppointmentDetail,
    onHandleClose,
  };
};

export default useAppointmentHistory;
