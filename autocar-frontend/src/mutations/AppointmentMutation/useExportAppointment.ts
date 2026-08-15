import { useState } from "react";
import toast from "react-hot-toast";
import { appointmentServices } from "../../services/appointment.service";

export const useExportAppointment = (appointmentId: string) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportExcel = async () => {
    if (!appointmentId) return;

    try {
      setIsExporting(true);

      const blob = await appointmentServices.exportExcelById(appointmentId);

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `appointment-${appointmentId}.xlsx`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);

      toast.success("Xuất lịch hẹn thành công");
    } catch {
      toast.error("Xuất Excel thất bại");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportExcel,
    isExporting,
  };
};
