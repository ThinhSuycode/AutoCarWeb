import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../queries/queryKeys";
import type { ContactFormData } from "../../schemas/contact.schema";
import { contactService } from "../../services/contact.service";
import toast from "react-hot-toast";

interface PostContactParams {
  carId?: string;
  data: ContactFormData;
}

const usePostContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ carId, data }: PostContactParams) =>
      carId
        ? contactService.postContact(carId, data)
        : contactService.postGeneralContact(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contact.all });

      toast.success("Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default usePostContact;
