import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carService } from "../../../../../../services/car.service";
import { carDetailsService } from "../../../../../../services/carDetail.service";
import toast from "react-hot-toast";
import { queryKeys } from "../../../../../../queries/queryKeys";
import type { CreateCarDto } from "../../../../../../schemas/car.schema";

const useCarFormMutation = () => {
  const queryClient = useQueryClient();

  // ───────────────── CREATE ─────────────────
  const createMutation = useMutation({
    mutationFn: async (formData: CreateCarDto) => {
      const newCar = await carService.create(formData);
      await carDetailsService.create({
        carId: newCar._id,
        location: "",
        description: "",
        images: [],
        features: [],
        specs: [],
      });

      return newCar;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.car.all,
      });
      toast.success("Tạo xe thành công!");
    },

    onError: () => {
      toast.error("Tạo xe thất bại!");
    },
  });

  // ───────────────── UPDATE ─────────────────
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      carService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.car.all,
      });
      toast.success("Cập nhật thành công!");

      // queryClient.setQueryData(["cars"], (old: any) => {
      //   if (!old) return old;

      //   return {
      //     ...old,

      //     data: old.data.map((car: any) =>
      //       car._id === updatedCar._id
      //         ? {
      //             ...car,
      //             ...updatedCar,
      //           }
      //         : car,
      //     ),
      //   };
      // });
    },

    onError: () => {
      toast.error("Cập nhật thất bại!");
    },
  });

  // ───────────────── DELETE ─────────────────
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await carService.delete(id);
    },

    onSuccess: async (_, id) => {
      toast.success("Xoá thành công!");
      try {
        await carDetailsService.delete(id);
      } catch (error) {
        console.error(error);
      }
      await queryClient.invalidateQueries({
        queryKey: ["cars"],
      });

      await queryClient.refetchQueries({
        queryKey: ["cars"],
      });
    },

    onError: () => {
      toast.error("Xoá thất bại!");
    },
  });

  return {
    createCar: createMutation.mutateAsync,
    updateCar: updateMutation.mutateAsync,
    deleteCar: deleteMutation.mutateAsync,
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,
  };
};

export default useCarFormMutation;
