import classNames from "classnames/bind";
import styles from "./CarManager.module.scss";
import type { CarManagerType } from "../../../types/managerStaff";
import CarManagerStats from "./components/CarManagerStats/CarManagerStats";
import CarManagerTable from "./components/CarManagerTable/CarManagerTable";
import PageHeader from "../../../components/PageHeader/PageHeader";
import useStaffManager from "./hooks/useStaffManager";
import CarManagerToolBar from "./components/CarManagerToolBar/CarManagerToolBar";

const cx = classNames.bind(styles);

const CarManager = () => {
  const { cars, isLoading, search, setSearch, statusFilter, setStatusFilter } =
    useStaffManager();
  return (
    <div className={cx("car-manager-page")}>
      <PageHeader
        title="Quản lý xe hệ thống"
        description="Quản lý xe được Admin phân bổ"
      >
        <div className={cx("header-date")}>
          <i className="fa-regular fa-calendar"></i>
          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </PageHeader>

      <CarManagerStats cars={cars as CarManagerType[]} />

      <CarManagerToolBar
        search={search}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
        statusFilter={statusFilter}
      ></CarManagerToolBar>

      <CarManagerTable cars={cars} isLoading={isLoading} />
    </div>
  );
};

export default CarManager;
