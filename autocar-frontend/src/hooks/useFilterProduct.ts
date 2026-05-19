import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { callApi } from "../services/api";
import type { CarType } from "../types/car";

interface FilterState {
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

    // MAP PRICE RANGE
    const priceRangesMap: Record<
      string,
      { priceMin: string; priceMax: string }
    > = {
      "Dưới 500 triệu": {
        priceMin: "0",
        priceMax: "500000000",
      },

      "500 - 800 triệu": {
        priceMin: "500000000",
        priceMax: "800000000",
      },

      "800 triệu - 1.2 tỷ": {
        priceMin: "800000000",
        priceMax: "1200000000",
      },

      "Trên 1.2 tỷ": {
        priceMin: "1200000000",
        priceMax: "",
      },
    };

    // HANDLE PRICE RANGE
    if (filter.priceRanges) {
      const range = priceRangesMap[filter.priceRanges];

      if (range) {
        params.set("priceMin", range.priceMin);
        params.set("priceMax", range.priceMax);
      }
    }
    // MAP YEAR RANGE
    const yearRangesMap: Record<
      string,
      { yearMin?: string; yearMax?: string }
    > = {
      "2024": {
        yearMin: "2024",
        yearMax: "2024",
      },

      "2023": {
        yearMin: "2023",
        yearMax: "2023",
      },

      "2022": {
        yearMin: "2022",
        yearMax: "2022",
      },

      "2021": {
        yearMin: "2021",
        yearMax: "2021",
      },

      "2020": {
        yearMin: "2020",
        yearMax: "2020",
      },

      "Trước 2020": {
        yearMax: "2019",
      },
    };

    // Handle Year Ranges
    if (filter.yearRanges) {
      const range = yearRangesMap[filter.yearRanges];
      if (range?.yearMin) {
        params.set("yearMin", range.yearMin);
      }
      if (range?.yearMax) {
        params.set("yearMax", range.yearMax);
      }
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
