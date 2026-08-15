import { useExportAppointment } from "../../../../mutations/AppointmentMutation/useExportAppointment";
import { useCurrentUser } from "../../../../queries/userQuery/useCurrentUser";
import useCancelAppointment from "../../../../mutations/AppointmentMutation/useCancelAppointment";
import useCompleteAppointment from "../../../../mutations/AppointmentMutation/useCompleteAppointment";
import useConfirmAppointment from "../../../../mutations/AppointmentMutation/useConfirmAppointment";

const useAppointmentDetail = (appointmentId: string) => {
  const login = !!localStorage.getItem("token");
  const { data: userData } = useCurrentUser(login);
  const { mutateAsync: confirmAppointment, isPending: isLoadingConfirm } =
    useConfirmAppointment();
  const { mutateAsync: cancelAppointment, isPending: isLoadingCancel } =
    useCancelAppointment();
  const { mutateAsync: completeAppointment, isPending: isLoadingComplete } =
    useCompleteAppointment();
  const { exportExcel, isExporting } = useExportAppointment(appointmentId);

  const roleIsUser = userData?.role === "user";
  return {
    confirmAppointment,
    cancelAppointment,
    completeAppointment,
    isLoadingConfirm,
    isLoadingCancel,
    isLoadingComplete,
    exportExcel,
    isExporting,
    roleIsUser,
  };
};

export default useAppointmentDetail;
