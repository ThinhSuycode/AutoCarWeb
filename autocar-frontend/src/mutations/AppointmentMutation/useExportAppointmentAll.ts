import { useState } from "react";
import toast from "react-hot-toast";
import { appointmentServices } from "../../services/appointment.service";

interface Props {
  search: string;
  status: string;
  sort: string;
}

export const useExportAppointmentAll = ({ search, status, sort }: Props) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportAllExcel = async () => {
    try {
      setIsExporting(true);

      const blob = await appointmentServices.exportExcel({
        search,
        status,
        sort,
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `appointments-${Date.now()}.xlsx`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      URL.revokeObjectURL(url);

      toast.success("Xuất danh sách lịch hẹn thành công");
    } catch {
      toast.error("Xuất Excel thất bại");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportAllExcel,
    isExporting,
  };
};
