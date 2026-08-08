import classNames from "classnames/bind";
import styles from "./CarFilterBar.module.scss";
import { FILTERS_ASSIGN } from "../../constants/assignManagerData";
import type { FilterType } from "../../types/assignManagerType";

const cx = classNames.bind(styles);

interface Props {
  active: FilterType;
  onChange: (val: FilterType) => void;
}

const CarFilterBar = ({ active, onChange }: Props) => (
  <div className={cx("filter")}>
    <span>Lọc:</span>
    {FILTERS_ASSIGN.map((f) => (
      <button
        key={f.value}
        className={cx("filter-btn", { active: active === f.value })}
        onClick={() => onChange(f.value)}
      >
        {f.label}
      </button>
    ))}
  </div>
);

export default CarFilterBar;
