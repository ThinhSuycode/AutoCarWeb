import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { contactService } from "../services/contact.service";
import { queryKeys } from "../queries/queryKeys";

const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => contactService.deleteContact(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.contact.all,
      });

      toast.success("Xoá liên hệ thành công!");
    },
  });
};

export default useDeleteContact;
