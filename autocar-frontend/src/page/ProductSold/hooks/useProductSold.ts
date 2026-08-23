import { useGetCars } from "../../../queries/carQuery/useCarAllQuery";

export const useProductSold = () => {
  const { data: carResponse, isPending } = useGetCars();

  return {
    carDataSold: carResponse?.data ?? [],
    isLoading: isPending,
  };
};
