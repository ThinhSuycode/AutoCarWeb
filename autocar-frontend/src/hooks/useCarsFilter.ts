import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { callApi } from "../services/api";
import type { CarType } from "../types/car";
import {
  PRICE_RANGES_MAP,
  YEAR_RANGES_MAP,
} from "../page/Home/constants/homeData";

export interface FilterState {
  brand: string;
  bodyType: string;
  transmission: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  sort: string;
  mode: string;
  priceRanges: string;
  yearRanges: string;
}

const INITIAL_FILTER: FilterState = {
  brand: "",
  bodyType: "",
  transmission: "",
  priceMin: "",
  priceMax: "",
  yearMin: "",
  yearMax: "",
  sort: "year-desc",
  mode: "grid",
  priceRanges: "",
  yearRanges: "Tất cả",
};

export const useCarsFilter = () => {
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);
  const [page, setPage] = useState(1);

  const buildParams = () => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("all", "true");

    if (filter.brand) params.set("brand", filter.brand);

    if (filter.bodyType) {
      params.set("bodyType", filter.bodyType);
    }

    if (filter.transmission) {
      params.set("transmission", filter.transmission);
    }
    if (filter.priceMin) params.set("priceMin", filter.priceMin);
    if (filter.priceMax) params.set("priceMax", filter.priceMax);
    if (filter.yearMin) {
      params.set("yearMin", filter.yearMin);
    }

    if (filter.yearMax) {
      params.set("yearMax", filter.yearMax);
    }

    // SORT
    const sortMap: Record<string, { sort: string; order: string }> = {
      "year-max": { sort: "year", order: "desc" },
      "year-min": { sort: "year", order: "asc" },
      "price-asc": { sort: "price", order: "asc" },
      "price-desc": { sort: "price", order: "desc" },
      "km-asc": { sort: "mileage", order: "asc" },
      "km-desc": { sort: "mileage", order: "desc" },
    };

    const { sort, order } = sortMap[filter.sort] ?? {
      sort: "createdAt",
      order: "desc",
    };

    params.set("sort", sort);
    params.set("order", order);

    // Price range
    if (filter.priceRanges) {
      const range = PRICE_RANGES_MAP[filter.priceRanges];
      if (range) {
        params.set("priceMin", range.priceMin);
        params.set("priceMax", range.priceMax);
      }
    }

    // Year range
    if (filter.yearRanges) {
      const range = YEAR_RANGES_MAP[filter.yearRanges];
      if (range?.yearMin) params.set("yearMin", range.yearMin);
      if (range?.yearMax) params.set("yearMax", range.yearMax);
    }
    return params.toString();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["cars", filter, page],
    queryFn: () =>
      callApi.getData<{ data: CarType[]; pagination: any }>(
        `cars?${buildParams()}`,
      ),

    placeholderData: (prev) => prev,
  });

  const onFilterChange = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilter((prev) => ({
        ...prev,
        [key]: value,
      }));

      setPage(1);
    },
    [],
  );

  const onReset = useCallback(() => {
    setFilter(INITIAL_FILTER);
    setPage(1);
  }, []);

  const activeFilters = Object.entries(filter).filter(
    ([key, val]) => val && key !== "sort",
  );

  return {
    cars: data?.data ?? [],
    pagination: data?.pagination,
    filter,
    isLoading,
    page,
    setPage,
    onFilterChange,
    onReset,
    activeFilters,
  };
};
