import classNames from "classnames/bind";
import styles from "./StatsBar.module.scss";
import type { ManagerCar } from "../../../../../types/user/manager-cars.type";
import type { Staff } from "../../../../../types/staff/staff.type";
const cx = classNames.bind(styles);

interface Props {
  cars: ManagerCar[];
  staffList: Staff[];
}

const StatsBar = ({ cars, staffList }: Props) => {
  const stats = [
    { label: "Tổng xe", value: cars.length },
    { label: "Đã phân bổ", value: cars.filter((c) => c.managerId).length },
    { label: "Chưa phân bổ", value: cars.filter((c) => !c.managerId).length },
    { label: "Nhân viên", value: staffList.length },
  ];
  return (
    <div className={cx("stats")}>
      {stats.map((s) => (
        <div key={s.label} className={cx("stat-item")}>
          <span>{s.value}</span>
          <p>{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
