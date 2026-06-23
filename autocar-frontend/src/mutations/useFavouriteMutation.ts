import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../types/users";
import { queryKeys } from "../queries/queryKeys";
import toast from "react-hot-toast";
import { updateFavourite } from "../services/user.service";

export type FavouritePayload = {
  id: string;
  data: UserType;
};

export const useFavouriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UserType, // data trả về
    Error, // error
    FavouritePayload // biến truyền vào mutate()
  >({
    mutationFn: ({ id, data }) => updateFavourite(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.me,
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
