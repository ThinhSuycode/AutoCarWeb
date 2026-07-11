import { useCallback, useState } from "react";
import { useUserAllQuery } from "../../../../queries/useUserAllQuery";
import toast from "react-hot-toast";
import { useConfirm } from "../../../../hooks/useConfirm";
import { useDeleteUser } from "../mutations/useDeleteUserMutation";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import type { GetDataProps } from "../types/usersManager.type";

export const useUsersManager = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const { data, isLoading, isFetching, error, refetch } = useUserAllQuery({
    page,
    limit,
    search,
    role: roleFilter,
  });
  const [userDetail, setUserDetail] = useState<GetDataProps>({
    userData: null,
    action: "",
  });
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
  const { confirm, confirmProps } = useConfirm();

  const { deleteUserMutation } = useDeleteUser();

  const onHandleClose = useCallback(() => {
    setIsCreateFormOpen(false);
    setUserDetail({
      userData: null,
      action: "",
    });
  }, []);

  const handleDeleteUser = useCallback(
    async (userId: string) => {
      const ok = await confirm({
        title: "Xoá người dùng!!",
        message: `Bạn có muốn xoá người dùng ${userId} này không?`,
        confirmText: "Xác nhận",
        cancelText: "Huỷ",
      });
      if (!ok) return;

      try {
        await deleteUserMutation(userId);
        toast.success("Xoá thành công dữ liệu người dùng!");
        onHandleClose();
        setPage(1);
      } catch (error) {
        toast.error(
          getErrorMessage(error) ?? "Xoá người dùng không thành công",
        );
      }
    },
    [confirm, onHandleClose, setPage],
  );

  return {
    usersData: data?.data ?? [],
    pagination: data?.pagination,
    page,
    setPage,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    isLoading,
    isFetching,
    error,
    refetch,

    userDetail,
    isCreateFormOpen,
    confirmProps,
    onHandleClose,
    handleDeleteUser,
    setIsCreateFormOpen,
    setUserDetail,
  };
};
