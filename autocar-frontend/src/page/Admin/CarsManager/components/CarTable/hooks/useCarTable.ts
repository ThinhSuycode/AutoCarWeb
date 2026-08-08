import { useCallback } from "react";
import { useConfirm } from "../../../../../../hooks/useConfirm";
import useCarFormMutation from "../../CarForm/mutations/useCarFormMutation";
import toast from "react-hot-toast";

const useCarTable = () => {
  const { deleteCar } = useCarFormMutation();

  const { confirm, confirmProps } = useConfirm();

  const onHandleDeleteCar = useCallback(
    async (id: string, name: string) => {
      const ok = await confirm({
        title: "Xoá xe",
        message: `Bạn có chắc muốn xoá xe "${name} - ${id}"? Hành động này không thể hoàn tác.`,
        confirmText: "Xoá",
        cancelText: "Huỷ",
      });

      if (!ok) return;

      try {
        deleteCar(id);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Xoá xe không thành công!",
        );
      }
    },
    [confirm],
  );
  return {
    confirmProps,
    onHandleDeleteCar,
  };
};

export default useCarTable;
