import { useCallback, useEffect, useState } from "react";
import type { UserType } from "../../../../types/users";
import toast from "react-hot-toast";
import type {
  PaginatedResponse,
  PaginationMeta,
} from "../../../../types/pagination";
import axios from "axios";

const API = import.meta.env.VITE_APP_API_KEYS;

const getToken = () => localStorage.getItem("token");
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

export const useUsersManager = () => {
  const [usersData, setUsersData] = useState<UserType[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 9,
  });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const fetchUserData = useCallback(
    async (page: number, keyword = "", role = "") => {
      try {
        const params = new URLSearchParams();

        if (keyword.trim()) {
          params.set("all", "true");
          params.set("search", keyword);
        } else {
          params.set("page", String(page));
          params.set("limit", String(9));
        }

        if (role) params.set("role", role);

        const userRes = await axios.get<PaginatedResponse<UserType>>(
          `${API}/users?${params.toString()}`,
          { headers: authHeader() },
        );

        setUsersData(userRes.data.data);
        setPagination(userRes.data.pagination);
      } catch {
        toast.error("Không thể tải dữ liệu người dùng!");
      }
    },
    [],
  );

  useEffect(() => {
    fetchUserData(1, search, roleFilter);
  }, [search, roleFilter]);

  const onPageChange = useCallback(
    (page: number) => {
      fetchUserData(page, search, roleFilter);
    },
    [fetchUserData, search, roleFilter],
  );

  return {
    usersData,
    pagination,
    onPageChange,
    setUsersData,
    setSearch,
    setRoleFilter,
  };
};
