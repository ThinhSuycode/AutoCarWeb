import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../../services/contact.service";
import type { STAFF_STATUS_CONTACT } from "../../page/Staff/MyContact/constants/statusLabelData";

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: STAFF_STATUS_CONTACT;
    }) =>
      contactService.updateContactStatus(id, {
        status,
      }),

    onSuccess: () => {
      toast.success("Cập nhật thành công");

      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Cập nhật thất bại");
    },
  });

  return {
    updateStatusAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
