import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";

export type ContactStatus = "pending" | "contacted" | "done" | "cancelled";
export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
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
    // updateStatus: mutation.mutate,
    updateStatusAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
