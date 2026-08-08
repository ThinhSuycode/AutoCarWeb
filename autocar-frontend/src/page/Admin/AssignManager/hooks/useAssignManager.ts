import { useCallback, useState } from "react";

import type { FilterType } from "../types/assignManagerType";

import useAssignCarQuery from "../queries/useAssignCarQuery";
import {
  useAssignManagerMutation,
  useRemoveManagerMutation,
} from "../mutations/useManagerMutation";
import toast from "react-hot-toast";
import useGetStaffQuery from "../queries/useGetStaffQuery";

export const useAssignManager = () => {
  const [assigningId, setAssigningId] = useState<string | null>(null);

  const [hasManager, setHasManagerState] = useState<FilterType>("all");

  const [page, setPage] = useState(1);

  const limit = 8;

  const { data, isLoading } = useAssignCarQuery({
    page,
    limit,
    hasManager,
  });

  const { data: staffRes } = useGetStaffQuery();

  const assignMutation = useAssignManagerMutation();

  const removeMutation = useRemoveManagerMutation();

  const staffData = staffRes?.data ?? [];

  const onManagerChange = useCallback(
    async (carId: string, managerId: string, username: string) => {
      try {
        setAssigningId(carId);

        if (!managerId) {
          await removeMutation.mutateAsync(carId);
          return;
        }

        await assignMutation.mutateAsync({
          carId,
          managerId,
        });
        toast.success(`Phân bổ thành công cho nhân viên ${username}!!`);
      } finally {
        setAssigningId(null);
      }
    },
    [assignMutation, removeMutation],
  );

  const onPageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const setHasManager = useCallback((value: FilterType) => {
    setHasManagerState(value);
    setPage(1);
  }, []);

  return {
    cars: data?.data ?? [],

    pagination: data?.pagination,

    staffData,

    assigningId,

    hasManager,

    page,

    isLoading,

    isAssigning: assignMutation.isPending || removeMutation.isPending,

    setHasManager,

    onPageChange,

    onManagerChange,
  };
};
