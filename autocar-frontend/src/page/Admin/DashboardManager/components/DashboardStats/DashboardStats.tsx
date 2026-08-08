import classNames from "classnames/bind";
import styles from "./DashboardStats.module.scss";
import { config } from "../../../../../config";
import type { DashboardStats as DashboardStatsType } from "../../../../../types/dashboard/dashboard.type";

const cx = classNames.bind(styles);

const DashboardStats = ({
  stats,
}: {
  stats: DashboardStatsType | undefined;
}) => {
  if (!stats) return;
  return (
    <div className={cx("stats-grid")}>
      <div className={cx("stat-card", "red")}>
        <div className={cx("stat-icon")}>
          <i className="fa-solid fa-car"></i>
        </div>
        <div className={cx("stat-info")}>
          <span className={cx("stat-value")}>{stats.totalCars}</span>
          <span className={cx("stat-label")}>Tổng xe</span>
        </div>
        <a href={config.Routes.CarsManager} className={cx("stat-link")}>
          Xem tất cả <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      <div className={cx("stat-card", "blue")}>
        <div className={cx("stat-icon")}>
          <i className="fa-solid fa-users"></i>
        </div>
        <div className={cx("stat-info")}>
          <span className={cx("stat-value")}>{stats.totalUsers}</span>
          <span className={cx("stat-label")}>Người dùng</span>
        </div>
        <a href={config.Routes.UsersManager} className={cx("stat-link")}>
          Xem tất cả <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      <div className={cx("stat-card", "green")}>
        <div className={cx("stat-icon")}>
          <i className="fa-solid fa-users-gear"></i>
        </div>
        <div className={cx("stat-info")}>
          <span className={cx("stat-value")}>{stats.totalStaff}</span>
          <span className={cx("stat-label")}>Nhân viên</span>
        </div>
        <a href={config.Routes.AssignManager} className={cx("stat-link")}>
          Xem tất cả <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      <div className={cx("stat-card", "orange")}>
        <div className={cx("stat-icon")}>
          <i className="fa-regular fa-calendar-check"></i>
        </div>
        <div className={cx("stat-info")}>
          <span className={cx("stat-value")}>{stats.totalAppointments}</span>
          <span className={cx("stat-label")}>Lịch hẹn</span>
        </div>
        <div className={cx("stat-badge")}>
          {stats.pendingAppointments} chờ xác nhận
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
