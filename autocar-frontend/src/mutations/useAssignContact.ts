import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";

export const useAssignContact = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, managerId }: { id: string; managerId: string | null }) =>
      contactService.assignContact(id, managerId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });

      toast.success("Phân công thành công");
    },

    onError: () => {
      toast.error("Phân công thất bại");
    },
  });

  return {
    assignContactStaff: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
