import { useMemo } from "react";
import type { CarManagerType } from "../../../../types/managerStaff";

const useCarManagerStaff = ({
  cars,
  search,
  statusFilter,
}: {
  cars: CarManagerType[];
  search: string;
  statusFilter: string;
}) => {
  const filteredCars = useMemo(() => {
    return (cars as CarManagerType[]).filter((car) => {
      const matchSearch =
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.brand.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" || car.managerStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [cars, search, statusFilter]);
  return {
    filteredCars,
  };
};

export default useCarManagerStaff;
