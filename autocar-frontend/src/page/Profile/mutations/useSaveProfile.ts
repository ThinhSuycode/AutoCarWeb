import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../../services/user.service";
import type { FormInputProfile } from "../../../schemas/user.schema";
import { queryKeys } from "../../../queries/queryKeys";
import toast from "react-hot-toast";

const useSaveProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: FormInputProfile;
    }) => userService.updateProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.me,
      });
      toast.success("Cập nhật dữ liệu thành công!!");
    },
  });
};

export default useSaveProfile;
