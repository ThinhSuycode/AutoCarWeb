import classNames from "classnames/bind";
import styles from "./DashboardOverview.module.scss";
import { STATUS_MAP } from "../../constants/dashboardData";
import { config } from "../../../../../config";
import { SERVICES_LABEL } from "../../../../../components/Appointment/AppointmentManager/constant/useAppointmentData";
import { formatDateToString } from "../../../../../hooks/formatDate";
import type { DashboardStats as DashboardStatsType } from "../../../../../types/dashboard/dashboard.type";

const cx = classNames.bind(styles);
const DashboardOverview = ({
  stats,
}: {
  stats: DashboardStatsType | undefined;
}) => {
  if (!stats) return;

  return (
    <div className={cx("main-grid")}>
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
                            {(appt.contactId.buyerId?.avatar ?? "?")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p>{appt.contactId.buyerId?.username ?? "?"}</p>
                            <span>{appt.contactId.buyerId?.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td>{appt.contactId.carId?.name || "--Không có--"}</td>
                      <td>
                        {/* {appt.createdAt} &nbsp; */}
                        <span className={cx("time")}>
                          {formatDateToString(appt.appointmentDate)}
                        </span>
                      </td>
                      <td>{SERVICES_LABEL[appt.appointmentType] ?? ""}</td>
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
                <span className={cx("role-badge", user.role)}>{user.role}</span>
              </div>
            ))
          ) : (
            <div className={cx("empty")}>Chưa có người dùng</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
