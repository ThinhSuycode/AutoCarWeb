import { useState } from "react";
import { getBannerStats } from "../constants/homeData";
import { useCarsFilter } from "../../../hooks/useCarsFilter";

export const useHome = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const {
    cars,
    filter,
    onFilterChange,
    onReset,
    pagination,
    isLoading,
    page,
    setPage,
    activeFilters,
  } = useCarsFilter();

  const bannerStats = getBannerStats(cars.length);
  const toggleFilter = () => setOpenFilter((prev) => !prev);

  return {
    cars,
    filter,
    openFilter,
    bannerStats,
    pagination,
    isLoading,
    page,
    activeFilters,
    setPage,
    onFilterChange,
    onReset,
    toggleFilter,
  };
};
