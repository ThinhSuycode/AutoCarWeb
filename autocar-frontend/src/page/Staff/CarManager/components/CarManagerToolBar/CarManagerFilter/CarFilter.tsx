import classNames from "classnames/bind";
import styles from "./CarFilter.module.scss";
import { MANAGER_STATUS_OPTIONS } from "../../../constant/managerStatus";
import type { ManagerStatus } from "../../../../../../types/car/car.constant";

const cx = classNames.bind(styles);

interface Props {
  value: string;
  onChange: (status: ManagerStatus | "all") => void;
}

export default function CarFilter({ value, onChange }: Props) {
  return (
    <div className={cx("filter-tabs")}>
      {MANAGER_STATUS_OPTIONS.map((item) => (
        <button
          key={item.value}
          className={cx("tab", {
            active: value === item.value,
          })}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
