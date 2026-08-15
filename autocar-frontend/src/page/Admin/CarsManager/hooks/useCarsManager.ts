import { useCallback, useEffect, useState } from "react";
import { useCarAllQuery } from "../../../../queries/carQuery/useCarAllQuery";
import type { CarType } from "../../../../types/car/car.type";
import type { ManagerCar } from "../../../../types/user/manager-cars.type";

export const useCarsManager = () => {
  const [page, setPage] = useState(1);
  const limit = 8;
  const [openCreate, setOpenCreate] = useState(false);

  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);

  const [openDetail, setOpenDetail] = useState<ManagerCar | null>(null);

  const [search, setSearch] = useState("");

  const { data, isPending } = useCarAllQuery({ page, limit, search });

  useEffect(() => {
    setPage(1);
  }, [search]);

  const onPageChange = useCallback(
    (page: number) => {
      setPage(page);
    },
    [search],
  );

  return {
    cars: data?.data,
    pagination: data?.pagination,
    onPageChange,
    setSearch,
    page,
    search,
    isLoading: isPending,
    openCreate,
    setOpenCreate,
    selectedCar,
    setSelectedCar,
    openDetail,
    setOpenDetail,
  };
};
