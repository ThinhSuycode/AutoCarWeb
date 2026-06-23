import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { carService } from "../services/car.service";

export const useUpdateManagerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      managerStatus,
    }: {
      id: string;
      managerStatus: string;
    }) => carService.updateManagerStatus(id, managerStatus),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manager-cars"] });
      toast.success("Cập nhật trạng thái thành công!");
    },

    onError: () => {
      toast.error("Cập nhật thất bại, thử lại!");
    },
  });
};
