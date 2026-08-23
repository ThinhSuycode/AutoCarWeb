import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { carDetailsService } from "../../../../../../services/carDetail.service";
import toast from "react-hot-toast";
import type {
  CarDetailFormType,
  UpdateCarDetailDto,
} from "../../../../../../schemas/carDetail.schema";
import { queryKeys } from "../../../../../../queries/queryKeys";

const useDetailFormMutation = (carId: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.carDetail.detail(carId),
    queryFn: () => carDetailsService.getDetail(carId!),
    enabled: !!carId,
  });

  const createMutation = useMutation({
    mutationFn: async (data: CarDetailFormType) =>
      await carDetailsService.create(data),

    onSuccess: (_data, variables) => {
      toast.success("Tạo thông tin thành công!");
      queryClient.invalidateQueries({
        queryKey: queryKeys.carDetail.detail(variables.carId),
      });
    },

    onError: () => {
      toast.error("Tạo thông tin thất bại!");
    },
  });

  // ───────────────── UPDATE──────────────
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCarDetailDto }) =>
      carDetailsService.update(id, data),

    onSuccess: (_data, variables) => {
      toast.success("Cập nhật thông tin thành công!");
      queryClient.invalidateQueries({
        queryKey: queryKeys.carDetail.detail(variables.id),
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
    onSuccess: (_data, id) => {
      toast.success("Xoá thông tin chi tiết thành công!!");
      queryClient.invalidateQueries({
        queryKey: queryKeys.carDetail.detail(id),
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

export default useDetailFormMutation;
