import { useState } from "react";
import { useManagedCars } from "../queries/useManagedCars";
import { useDebounce } from "../../../../hooks/useDebounce";

const useStaffManager = () => {
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 450);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  const [statusFilter, setStatusFilter] = useState("all");
  const { cars, isLoading } = useManagedCars({
    search: searchDebounce,
    page,
    limit,
    managerStatus: statusFilter,
  });

  return {
    cars,
    isLoading,
    search,
    setSearch,
    setPage,
    statusFilter,
    setStatusFilter,
  };
};

export default useStaffManager;
