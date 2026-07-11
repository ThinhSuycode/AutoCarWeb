import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import type {
  PaginatedResponse,
  PaginationMeta,
} from "../../../../types/pagination";
import axios from "axios";
import type { CarType } from "../../../../types/car";

const API = import.meta.env.VITE_APP_API_KEYS;
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });
const getToken = () => localStorage.getItem("token");

export const useCarsManager = () => {
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    total: 1,
    totalPages: 0,
    limit: 9,
  });

  const [cars, setCars] = useState<CarType[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async (page: number, keyword = "") => {
    try {
      const params = new URLSearchParams();

      if (keyword.trim()) {
        params.set("all", "true");
        params.set("search", keyword);
      } else {
        params.set("page", String(page));
        params.set("limit", String(9));
      }

      const carRes = await axios.get<PaginatedResponse<CarType>>(
        `${API}/cars?${params.toString()}`,
        {
          headers: authHeader(),
        },
      );

      setCars(carRes.data.data);
      setPagination(carRes.data.pagination);
    } catch {
      toast.error("Không thể tải dữ liệu!");
    }
  }, []);

  useEffect(() => {
    fetchData(1, search);
  }, [search]);

  const onPageChange = useCallback(
    (page: number) => {
      fetchData(page, search);
    },
    [fetchData, search],
  );

  return {
    cars,
    pagination,
    onPageChange,
    setSearch,
    reloadCars: fetchData,
  };
};
