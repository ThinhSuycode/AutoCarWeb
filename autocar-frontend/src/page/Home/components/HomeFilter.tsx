import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { FILTER_SELECTS } from "../constants/homeData";
import type { FilterState } from "../../../hooks/useCarsFilter";

const cx = classNames.bind(styles);

interface HomeFilterProps {
  openFilter: boolean;
  filter: FilterState;
  onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;

  onToggle: () => void;
}

const HomeFilter = ({
  openFilter,
  filter,
  onFilterChange,
  onToggle,
}: HomeFilterProps) => {
  return (
    <div className={cx("product-filter-inner")}>
      <div className={cx("filter-mobile")} onClick={onToggle}>
        <span>
          <i className="fa-solid fa-filter" />
        </span>
        <span>Bộ lọc</span>
      </div>

      <div className={cx("filter-list-nav", { openFilter })}>
        {FILTER_SELECTS.map(({ name, field, options }) => (
          <select
            key={name}
            name={name}
            data-aos="zoom-in"
            onChange={(e) => onFilterChange(field, e.target.value)}
            value={filter[field] ?? ""}
          >
            {options.map((opt, idx) => (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
};

export default HomeFilter;
