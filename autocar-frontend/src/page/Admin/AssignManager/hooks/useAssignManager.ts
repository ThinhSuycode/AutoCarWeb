import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import type { PaginationMeta } from "../../../../types/pagination";
import type { CarManagerType } from "../../../../types/managerStaff";
import type { Staff } from "../../../../types/car";

const API = import.meta.env.VITE_APP_API_KEYS;
const getToken = () => localStorage.getItem("token");
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

export type FilterType = "all" | "true" | "false";

export const useAssignManager = () => {
  const [cars, setCars] = useState<CarManagerType[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });

  const fetchData = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(pagination.limit));
        if (filter !== "all") params.set("hasManager", filter);

        const [carsRes, staffRes] = await Promise.all([
          axios.get(`${API}/cars/admin/all?${params.toString()}`, {
            headers: authHeader(),
          }),
          axios.get(`${API}/cars/admin/staff`, { headers: authHeader() }),
        ]);
        setCars(carsRes.data.data);
        setPagination(carsRes.data.pagination);
        setStaffList(staffRes.data.data);
      } catch {
        toast.error("Không thể tải dữ liệu!");
      } finally {
        setIsLoading(false);
      }
    },
    [filter, pagination.limit],
  );

  useEffect(() => {
    fetchData(1);
  }, [filter]);

  const onAssign = useCallback(
    async (carId: string, managerId: string) => {
      const isUnassign = !managerId;
      const url = `${API}/cars/${carId}/${isUnassign ? "unassign" : "assign"}`;

      try {
        setAssigningId(carId);
        await axios.patch(url, isUnassign ? {} : { managerId }, {
          headers: authHeader(),
        });
        toast.success(isUnassign ? "Đã hủy phân bổ!" : "Phân bổ thành công!");
        fetchData(pagination.page); //  Reload đúng trang hiện tại
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Có lỗi xảy ra!");
      } finally {
        setAssigningId(null);
      }
    },
    [fetchData, pagination.page],
  );

  //  Handler chuyển trang
  const onPageChange = useCallback(
    (page: number) => {
      fetchData(page);
    },
    [fetchData],
  );

  return {
    cars,
    staffList,
    isLoading,
    assigningId,
    filter,
    setFilter,
    onAssign,
    pagination,
    onPageChange,
  };
};
