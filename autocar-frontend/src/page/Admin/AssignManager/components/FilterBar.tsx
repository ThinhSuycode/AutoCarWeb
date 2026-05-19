import classNames from "classnames/bind";
import styles from "../AssignManager.module.scss";
import type { FilterType } from "../hooks/useAssignManager";

const cx = classNames.bind(styles);

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Chưa phân bổ", value: "false" },
  { label: "Đã phân bổ", value: "true" },
];

interface Props {
  active: FilterType;
  onChange: (val: FilterType) => void;
}

const FilterBar = ({ active, onChange }: Props) => (
  <div className={cx("filter")}>
    <span>Lọc:</span>
    {FILTERS.map((f) => (
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

export default FilterBar;
