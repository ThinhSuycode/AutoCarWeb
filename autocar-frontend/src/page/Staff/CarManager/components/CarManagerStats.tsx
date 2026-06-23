import classNames from "classnames/bind";
import styles from "../CarManager.module.scss";
import type {
  CarManagerType,
  ManagerStatus,
} from "../../../../types/managerStaff";
import { MANAGER_STATUS_MAP } from "../../../../constants/managerStatus";

const cx = classNames.bind(styles);

interface Props {
  cars: CarManagerType[];
}

const STAT_STATUSES: ManagerStatus[] = [
  "pending",
  "received",
  "maintenance",
  "ready",
  "completed",
];

const CarManagerStats = ({ cars }: Props) => {
  const countByStatus = (status: ManagerStatus) =>
    cars.filter((c) => c.managerStatus === status).length;

  return (
    <div className={cx("stats-grid")}>
      <div className={cx("stat-card", "total")}>
        <div className={cx("stat-icon")}>
          <i className="fa-solid fa-car"></i>
        </div>
        <div className={cx("stat-content")}>
          <h3>{cars.length}</h3>
          <p>Tổng xe phụ trách</p>
        </div>
      </div>

      {STAT_STATUSES.map((status) => {
        const { label, icon, className } = MANAGER_STATUS_MAP[status];
        return (
          <div key={status} className={cx("stat-card", className)}>
            <div className={cx("stat-icon")}>
              <i className={`fa-solid ${icon}`}></i>
            </div>
            <div className={cx("stat-content")}>
              <h3>{countByStatus(status)}</h3>
              <p>{label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarManagerStats;
