import classNames from "classnames/bind";
import styles from "./AppointmentManager.module.scss";
import PageHeader from "../../PageHeader/PageHeader";
import AppointmentTable from "./components/AppointmentTable/AppointmentTable";
import PagePagination from "../../PagePagination/PagePagination";
import AppointmentDetail from "../AppointmentDetail/AppointmentDetail";
import ModalLayout from "../../ModalLayout/ModalLayout";
import useAppointmentManager from "./hooks/useAppointmentManager";
import AppointmentStatistics from "./components/AppointmentStatistics/AppointmentStatistics";
import AppointmentToolbar from "./components/AppointmentToolbar/AppointmentToolbar";
import OrderForm from "../../Order/OrderForm/OrderForm";
import OrderDetail from "../../Order/OrderDetailForm/OrderDetailForm";

const cx = classNames.bind(styles);

interface Props {
  role: "admin" | "staff";
}

const AppointmentManager = ({ role }: Props) => {
  const {
    appointments,
    pagination,

    page,
    search,
    status,
    onRefresh,

    appointmentDetail,
    setAppointmnetDetail,
    orderMode,
    setOrderMode,
    setPage,
    setSearch,
    setStatus,
    stats,

    onHandleClose,
    isLoading,
    exportAllExcel,
    isExporting,

    orderDetail,
  } = useAppointmentManager();

  return (
    <div className={cx("appointment-page")}>
      <PageHeader
        title="Quản lý lịch hẹn"
        description="Quản lý, theo dõi và xử lý toàn bộ lịch hẹn của khách hàng."
      />

      <ModalLayout
        showForm={!!appointmentDetail}
        classNames="appointment"
        onClose={onHandleClose}
      >
        {appointmentDetail ? (
          orderMode === "" ? (
            <div className={cx("appointment-form")}>
              <AppointmentDetail
                appointment={appointmentDetail}
                order={orderDetail}
                setOrderMode={(message) => setOrderMode(message)}
              />
            </div>
          ) : orderMode === "create" ? (
            <OrderForm
              appointment={appointmentDetail}
              setBack={() => setOrderMode("")}
              onClose={onHandleClose}
            ></OrderForm>
          ) : (
            <OrderDetail
              order={orderDetail}
              onBack={(mode) => setOrderMode(mode)}
            ></OrderDetail>
          )
        ) : (
          <></>
        )}
      </ModalLayout>

      <AppointmentStatistics stats={stats}></AppointmentStatistics>

      <AppointmentToolbar
        status={status}
        search={search}
        onSearch={setSearch}
        onStatus={setStatus}
        onRefresh={onRefresh}
        isExport={isExporting}
        onExport={exportAllExcel}
      ></AppointmentToolbar>

      <AppointmentTable
        isLoading={isLoading}
        role={role}
        appointments={appointments}
        onChangeAppointment={setAppointmnetDetail}
      />

      {pagination.totalPages > 1 && (
        <PagePagination
          currentPage={page}
          total={pagination.total}
          limit={pagination.limit}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default AppointmentManager;
