import { useEffect, useState } from "react";
import { useCarAllQuery } from "../../../../../queries/carQuery/useCarAllQuery";
import { useDebounce } from "../../../../../hooks/useDebounce";
import type { CarType } from "../../../../../types/car/car.type";

const useSearchCars = () => {
  const [search, setSearch] = useState<string>("");
  const searchValue = useDebounce(search, 450);
  const trimmedSearch = searchValue.trim();

  const [carsResult, setCarsResult] = useState<CarType[]>([]);
  const [page] = useState<number>(1);
  const [limit] = useState<number>(8);

  const { data: carResponse, isPending } = useCarAllQuery({
    search: trimmedSearch,
    page,
    limit,
  });

  useEffect(() => {
    if (!trimmedSearch) {
      setCarsResult([]);
      return;
    }

    setCarsResult(carResponse?.data ?? []);
  }, [trimmedSearch, carResponse?.data]);

  const handleClearAll = () => setSearch("");

  const isDebouncing = search.trim() !== trimmedSearch;

  return {
    carsResult,
    isLoading: isPending,
    setSearch,
    search,
    isDebouncing,
    handleClearAll,
  };
};

export default useSearchCars;
