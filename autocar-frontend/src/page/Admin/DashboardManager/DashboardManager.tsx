import classNames from "classnames/bind";
import styles from "./DashboardManager.module.scss";
import { config } from "../../../config";
import { useDashboardManager } from "./useDashboardManager";
import Charts from "./components/Charts";
import QuickAction from "./components/QuickAction";

const cx = classNames.bind(styles);

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  pending: { label: "Chờ xác nhận", cls: "pending" },
  confirmed: { label: "Đã xác nhận", cls: "confirmed" },
  completed: { label: "Hoàn thành", cls: "completed" },
  cancelled: { label: "Đã huỷ", cls: "cancelled" },
};

const DashboardManager = () => {
  const { stats, isLoading } = useDashboardManager();

  if (isLoading) {
    return (
      <div className={cx("dashboardManager-page")}>
        <div className={cx("loading")}>
          <i className="fa-solid fa-spinner"></i>
          <span>Đang tải dữ liệu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("dashboardManager-page")}>
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className={cx("page-header")}>
        <div className={cx("header-left")}>
          <h2>Dashboard</h2>
          <p>Tổng quan hệ thống AutoViet</p>
        </div>
        <div className={cx("header-right")}>
          <span className={cx("date")}>
            <i className="fa-regular fa-calendar"></i>
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <Charts></Charts>

      {/* ── Stats cards ─────────────────────────────────────────────────────── */}
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

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className={cx("main-grid")}>
        {/* Lịch hẹn gần đây */}
        <div className={cx("section-card", "wide")}>
          <div className={cx("section-header")}>
            <h3>Lịch hẹn gần đây</h3>
            <span className={cx("badge", "pending")}>
              {stats.pendingAppointments} chờ xử lý
            </span>
          </div>

          <div className={cx("table-wrapper")}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Xe</th>
                  <th>Ngày hẹn</th>
                  <th>Loại</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAppointments.length > 0 ? (
                  stats.recentAppointments.map((appt) => {
                    const status = STATUS_MAP[appt.status] ?? {
                      label: appt.status,
                      cls: "pending",
                    };
                    return (
                      <tr key={appt._id} className={cx("row")}>
                        <td>
                          <div className={cx("user-cell")}>
                            <div className={cx("user-avatar")}>
                              {(appt.userId?.username || appt.name || "?")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div>
                              <p>{appt.userId?.username || appt.name}</p>
                              <span>{appt.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td>{appt.carName || "—"}</td>
                        <td>
                          {appt.date} &nbsp;
                          <span className={cx("time")}>{appt.time}</span>
                        </td>
                        <td>{appt.type}</td>
                        <td>
                          <span className={cx("status-badge", status.cls)}>
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className={cx("empty")}>
                      Chưa có lịch hẹn nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Người dùng mới */}
        <div className={cx("section-card")}>
          <div className={cx("section-header")}>
            <h3>Người dùng mới</h3>
            <a href={config.Routes.UsersManager} className={cx("view-all")}>
              Xem tất cả
            </a>
          </div>

          <div className={cx("user-list")}>
            {stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((user) => (
                <div key={user._id} className={cx("user-item")}>
                  <div className={cx("user-avatar", "small")}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} />
                    ) : (
                      (user.username || "?").charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className={cx("user-info")}>
                    <p>{user.username}</p>
                    <span>{user.email}</span>
                  </div>
                  <span className={cx("role-badge", user.role)}>
                    {user.role}
                  </span>
                </div>
              ))
            ) : (
              <div className={cx("empty")}>Chưa có người dùng</div>
            )}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <QuickAction></QuickAction>
    </div>
  );
};

export default DashboardManager;
