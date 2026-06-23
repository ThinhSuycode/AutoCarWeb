import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { carDetailsService } from "../services/carDetail.service";
import type { CarDetailsType } from "../../../../types/car";
import type { CarDetailFormData } from "../../../../schemas/carDetail.schema";

export const useCarDetail = (carId?: string) => {
  const queryClient = useQueryClient();

  // ───────────────── GET DETAIL ─────────────────
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["car-detail", carId],

    queryFn: () => carDetailsService.getDetail(carId!),

    enabled: !!carId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: CarDetailsType) =>
      await carDetailsService.create(data),

    onSuccess: () => {
      toast.success("Tạo thông tin thành công!");

      queryClient.invalidateQueries({
        queryKey: ["car-detail", carId],
      });
    },

    onError: () => {
      toast.error("Tạo thông tin thất bại!");
    },
  });

  // ───────────────── UPDATE──────────────
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CarDetailFormData }) =>
      carDetailsService.update(id, data),

    onSuccess: () => {
      toast.success("Cập nhật thông tin thành công!");

      queryClient.invalidateQueries({
        queryKey: ["car-detail", carId],
      });
    },

    onError: () => {
      toast.error("Cập nhật thất bại!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await carDetailsService.delete(id);
    },
    onSuccess: () => {
      toast.success("Xoá thông tin chi tiết thành công!!");

      queryClient.invalidateQueries({
        queryKey: ["car-detail", carId],
      });
    },
    onError: () => {
      toast.error("Xoá không thành công!!");
    },
  });

  return {
    carDetail: data ?? null,
    createDetail: createMutation.mutate,
    detailLoading: isLoading,

    refetchDetail: refetch,

    updateDetail: updateMutation.mutate,

    deleteDetail: deleteMutation.mutate,
    updating: updateMutation.isPending,
  };
};
