import classNames from "classnames/bind";
import styles from "./AssignManager.module.scss";
import { useAssignManager } from "./hooks/useAssignManager";
import StatsBar from "./components/StatsBar";
import CarTable from "./components/CarTable/CarTable";
import PageHeader from "../../../components/PageHeader/PageHeader";
import CarFilterBar from "./components/CarFilterBar/CarFilterBar";
import PagePagination from "../../../components/PagePagination/PagePagination";
import Pagination from "./components/Pagination";

const cx = classNames.bind(styles);

const AssignManager = () => {
  const {
    cars,
    staffList,
    isLoading,
    assigningId,
    filter,
    setFilter,
    onAssign,
    pagination,
    onPageChange,
  } = useAssignManager();

  return (
    <div className={cx("assignManager-page")}>
      <PageHeader
        title="Phân Bổ Nhân Viên Quản Lý Xe"
        description="Quản lý xe phân công cho nhân viên"
      >
        <CarFilterBar active={filter} onChange={setFilter} />
      </PageHeader>
      <StatsBar cars={cars} staffList={staffList} />
      {isLoading ? (
        <div className={cx("loading")}>Đang tải...</div>
      ) : (
        <div className={cx("table-content")}>
          <CarTable
            cars={cars}
            staffList={staffList}
            assigningId={assigningId}
            onAssign={onAssign}
          />
          <Pagination pagination={pagination} onPageChange={onPageChange} />
        </div>
      )}
      {/* <PagePagination
        onPageChange={setPage}
        currentPage={page}
        limit={pagination?.limit ?? 8}
        totalPages={pagination?.totalPages ?? 0}
        total={pagination?.total ?? 0}
      ></PagePagination> */}
    </div>
  );
};

export default AssignManager;
