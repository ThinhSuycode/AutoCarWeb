import classNames from "classnames/bind";
import styles from "../AppointmentManager.module.scss";
import type { AppointmentStatisticsType } from "../utils/appointmentStatistics";

const cx = classNames.bind(styles);

interface Props {
  stats: AppointmentStatisticsType;
}

const AppointmentStatistics = ({ stats }: Props) => {
  return (
    <div className={cx("statistics")}>
      <div className={cx("card")}>
        <span>Tổng lịch hẹn</span>
        <strong>{stats.total}</strong>
      </div>

      <div className={cx("card", "pending")}>
        <span>Chờ xác nhận</span>
        <strong>{stats.pending}</strong>
      </div>

      <div className={cx("card", "confirmed")}>
        <span>Đã xác nhận</span>
        <strong>{stats.confirmed}</strong>
      </div>

      <div className={cx("card", "completed")}>
        <span>Hoàn thành</span>
        <strong>{stats.completed}</strong>
      </div>

      <div className={cx("card", "cancelled")}>
        <span>Đã hủy</span>
        <strong>{stats.cancelled}</strong>
      </div>
    </div>
  );
};

export default AppointmentStatistics;
