import classNames from "classnames/bind";
import styles from "../CarsManager.module.scss";
import type { CarType } from "../../../../types/car";
const cx = classNames.bind(styles);

interface Props {
  cars: CarType[];
}

const StatsBar = ({ cars }: Props) => {
  const stats = [{ label: "Tổng xe", value: cars.length }];
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
