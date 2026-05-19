import classNames from "classnames/bind";
import styles from "./AssignManager.module.scss";
import { useAssignManager } from "./hooks/useAssignManager";
import StatsBar from "./components/StatsBar";
import FilterBar from "./components/FilterBar";
import CarTable from "./components/CarTable";
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
      <div className={cx("header")}>
        <h2>Phân Bổ Nhân Viên Quản Lý Xe</h2>
        <FilterBar active={filter} onChange={setFilter} />
      </div>
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
    </div>
  );
};

export default AssignManager;
