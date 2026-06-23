import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

import { carService } from "../services/car.service";
import { carDetailsService } from "../services/carDetail.service";
import type { CarFormData } from "../../../../schemas/car.schema";

export const useCars = () => {
  const queryClient = useQueryClient();

  // ───────────────── STATE ─────────────────
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // ───────────────── GET ALL ─────────────────
  const { data, isLoading } = useQuery({
    queryKey: ["cars", page, search],

    queryFn: () =>
      carService.getAll({
        page,
        limit: 9,
        search,
      }),

    staleTime: 0,
  });

  const cars = data?.data ?? [];
  const pagination = data?.pagination;

  // ───────────────── CREATE ─────────────────
  const createMutation = useMutation({
    mutationFn: async (formData: CarFormData) => {
      const newCar = await carService.create(formData);
      await carDetailsService.create({
        carId: newCar,
        name: newCar.name,
        brand: newCar.brand,
        price: newCar.price,
        year: newCar.year,
        mileage: newCar.mileage,
        transmission: newCar.transmission,
        location: "",
        description: "",
        images: [],
        features: [],
        specs: [],
      });

      return newCar;
    },

    onSuccess: (newCar) => {
      toast.success("Tạo xe thành công!");

      queryClient.setQueryData(["cars", page, search], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: [newCar, ...(old.data || [])],
        };
      });
    },

    onError: () => {
      toast.error("Tạo xe thất bại!");
    },
  });

  // ───────────────── UPDATE ─────────────────
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      carService.update(id, data),

    onSuccess: (updatedCar) => {
      toast.success("Cập nhật thành công!");

      queryClient.setQueryData(["cars", page, search], (old: any) => {
        if (!old) return old;

        return {
          ...old,

          data: old.data.map((car: any) =>
            car._id === updatedCar._id
              ? {
                  ...car,
                  ...updatedCar,
                }
              : car,
          ),
        };
      });
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
    cars,
    pagination,
    isLoading,

    page,
    setPage,

    search,
    setSearch,

    createCar: createMutation.mutate,
    updateCar: updateMutation.mutate,
    deleteCar: deleteMutation.mutate,
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,
  };
};
