import { useCallback, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import useAppointments from "../../../../queries/useAppointments";
import { useCurrentUser } from "../../../../queries/useCurrentUser";
import { appointmentStatistics } from "../utils/appointmentStatistics";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../queries/queryKeys";
import { useExportAppointmentAll } from "../../../../mutations/useExportAppointmentAll";
import type { Appointment } from "../../../../types/appointment/appointment.type";
import { useOrderDetail } from "../../../../queries/orderQuery/useOrderDetail";
import type { OrderModeType } from "../constant/useAppointmentData";

const useAppointmentManager = () => {
  const token = !!localStorage.getItem("token");
  const { data: user } = useCurrentUser(token);

  const isAdmin = user?.role === "admin";
  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [sort, setSort] = useState("date_desc");

  const queryClient = useQueryClient();

  const onRefresh = async () => {
    await queryClient.invalidateQueries({
      queryKey: queryKeys.appointment.all,
    });
  };
  const searchDebounce = useDebounce(search, 500);

  const [appointmentDetail, setAppointmnetDetail] = useState<
    Appointment | undefined
  >(undefined);

  const { data, isLoading } = useAppointments({
    page,
    limit,
    search: searchDebounce,
    status,
    sort,
  });
  const stats = appointmentStatistics(data?.data ?? []);
  const { exportAllExcel, isExporting } = useExportAppointmentAll({
    search,
    status,
    sort,
  });

  const { data: orderData, isLoading: loadingOrder } = useOrderDetail(
    appointmentDetail?._id ?? "",
  );
  const [orderMode, setOrderMode] = useState<OrderModeType>("");
  const onHandleClose = useCallback(() => {
    if (appointmentDetail) {
      setAppointmnetDetail(undefined);
      if (orderMode) {
        setOrderMode("");
      }
    }
  }, [appointmentDetail, orderMode]);
  return {
    appointments: data?.data ?? [],

    pagination: data?.pagination ?? {
      page: 1,
      limit,
      total: 0,
      totalPages: 1,
    },
    stats,

    appointmentDetail,
    setAppointmnetDetail,

    role: user?.role,
    isAdmin,

    page,
    limit,
    search,
    status,
    sort,

    orderMode,
    setOrderMode,

    setPage,
    setSearch,
    setStatus,
    setSort,
    onRefresh,
    onHandleClose,

    isLoading,
    exportAllExcel,
    isExporting,

    orderDetail: orderData?.data,
    loadingOrder,
  };
};

export default useAppointmentManager;
