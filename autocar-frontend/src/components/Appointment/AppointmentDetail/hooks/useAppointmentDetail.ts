import { useExportAppointment } from "../../../../mutations/useExportAppointment";
import useCancelAppointment from "../mutations/useCancelAppointment";
import useCompleteAppointment from "../mutations/useCompleteAppointment";
import useConfirmAppointment from "../mutations/useConfirmAppointment";

const useAppointmentDetail = (appointmentId: string) => {
  const { mutateAsync: confirmAppointment, isPending: isLoadingConfirm } =
    useConfirmAppointment();
  const { mutateAsync: cancelAppointment, isPending: isLoadingCancel } =
    useCancelAppointment();
  const { mutateAsync: completeAppointment, isPending: isLoadingComplete } =
    useCompleteAppointment();
  const { exportExcel, isExporting } = useExportAppointment(appointmentId);

  return {
    confirmAppointment,
    cancelAppointment,
    completeAppointment,
    isLoadingConfirm,
    isLoadingCancel,
    isLoadingComplete,
    exportExcel,
    isExporting,
  };
};

export default useAppointmentDetail;
