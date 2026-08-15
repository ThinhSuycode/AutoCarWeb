import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFavourite } from "../../services/user.service";
import { queryKeys } from "../../queries/queryKeys";

export interface FavouritePayload {
  id: string;
  carId: string;
}

export const useFavouriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, carId }: FavouritePayload) =>
      await updateFavourite(id, carId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.me,
      });
    },
  });
};
