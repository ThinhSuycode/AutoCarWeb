import classNames from "classnames/bind";
import styles from "./AppointmentStatistics.module.scss";
import type { AppointmentStatisticsType } from "../../utils/appointmentStatistics";

const cx = classNames.bind(styles);

interface Props {
  stats: AppointmentStatisticsType;
}
type StatisticCard = {
  key: string;
  title: string;
  className: string;
  icon: string;
  value: (stats: AppointmentStatisticsType) => number | string;
};

const cards: StatisticCard[] = [
  {
    key: "total",
    title: "Tổng lịch hẹn",
    value: (stats) => stats.total,
    className: "total",
    icon: "fa-calendar-days",
  },
  {
    key: "pending",
    title: "Chờ xác nhận",
    value: (stats) => stats.pending,
    className: "pending",
    icon: "fa-clock",
  },
  {
    key: "confirmed",
    title: "Đã xác nhận",
    value: (stats) => stats.confirmed,
    className: "confirmed",
    icon: "fa-circle-check",
  },
  {
    key: "completed",
    title: "Hoàn thành",
    value: (stats) => stats.completed,
    className: "completed",
    icon: "fa-flag-checkered",
  },
  {
    key: "cancelled",
    title: "Đã hủy",
    value: (stats) => stats.cancelled,
    className: "cancelled",
    icon: "fa-ban",
  },
  {
    key: "rate",
    title: "Tỷ lệ hoàn thành",
    value: (stats) => `${stats.completionRate}%`,
    className: "rate",
    icon: "fa-chart-line",
  },
];

const AppointmentStatistics = ({ stats }: Props) => {
  return (
    <div className={cx("statistics")}>
      {cards.map((card) => (
        <div key={card.key} className={cx("card", card.className)}>
          <div className={cx("card-header")}>
            <span>{card.title}</span>
            <i className={`fa-solid ${card.icon}`} />
          </div>

          <strong>{card.value(stats)}</strong>
        </div>
      ))}
    </div>
  );
};

export default AppointmentStatistics;
