import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../../queries/queryKeys";

import type { AssignManagerPayload } from "../../page/Admin/AssignManager/types/assignManagerType";
import toast from "react-hot-toast";
import { managerAdminServices } from "../../services/manager.service";

export const useAssignManagerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignManagerPayload) =>
      managerAdminServices.assignManager(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.managerCar.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.staff,
      });
    },
  });
};

export const useRemoveManagerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId: string) => managerAdminServices.removeManager(carId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.managerCar.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.staff,
      });
      toast.success("Huỷ phân bổ thành công!!");
    },
  });
};
