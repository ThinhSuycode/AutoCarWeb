import classNames from "classnames/bind";
import styles from "./CarManager.module.scss";
import { useState } from "react";
import LoadingData from "../../../components/LoadingData/LoadingData";
import { useStaffManager } from "../../../queries/useStaffManager";
import type { CarManagerType } from "../../../types/managerStaff";
import CarManagerStats from "./components/CarManagerStats";
import CarManagerTable from "./components/CarManagerTable";
import useCarManagerStaff from "./hooks/useCarManagerStaff";

const cx = classNames.bind(styles);

const CarManager = () => {
  const { cars, isLoading } = useStaffManager();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { filteredCars } = useCarManagerStaff({ cars, search, statusFilter });

  if (isLoading) return <LoadingData message="Đang tải danh sách xe..." />;

  return (
    <div className={cx("car-manager-page")}>
      {/* HEADER */}
      <div className={cx("page-header")}>
        <div className={cx("header-left")}>
          <h2>Xe được phân bổ</h2>
          <p>Quản lý và cập nhật trạng thái các xe bạn phụ trách</p>
        </div>
        <div className={cx("header-date")}>
          <i className="fa-regular fa-calendar"></i>
          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>

      {/* STATS */}
      <CarManagerStats cars={cars as CarManagerType[]} />

      {/* TOOLBAR */}
      <div className={cx("toolbar")}>
        <div className={cx("search-box")}>
          <i className="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Tìm theo tên xe, hãng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={cx("filter-tabs")}>
          {[
            "all",
            "pending",
            "received",
            "maintenance",
            "ready",
            "completed",
          ].map((s) => (
            <button
              key={s}
              className={cx("tab", { active: statusFilter === s })}
              onClick={() => setStatusFilter(s)}
            >
              {s === "all"
                ? "Tất cả"
                : s === "pending"
                  ? "Chờ xác nhận"
                  : s === "received"
                    ? "Đã tiếp nhận"
                    : s === "maintenance"
                      ? "Bảo dưỡng"
                      : s === "ready"
                        ? "Sẵn sàng"
                        : "Hoàn thành"}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <CarManagerTable cars={filteredCars} />
    </div>
  );
};

export default CarManager;
