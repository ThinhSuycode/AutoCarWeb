import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductToolbar.module.scss";
import type { FilterState } from "../../../../hooks/useCarsFilter";
import {
  modeData,
  SORT_OPTIONS,
  type ModeDataType,
} from "../../../../constants/carDatax";

const cx = classNames.bind(styles);

interface Props {
  count: number;
  filter: any;
  onReset: () => void;
  onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
}

const ProductToolbar: React.FC<Props> = ({
  count,
  filter,
  onReset,
  onFilterChange,
}) => {
  return (
    <div className={cx("info-show")}>
      <div className={cx("left")}>{count} xe tìm thấy</div>

      <div className={cx("right")}>
        <span onClick={onReset}>
          <i className="fa-solid fa-retweet"></i>
        </span>

        <select
          value={filter.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
        >
          {SORT_OPTIONS.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>

        <div className={cx("mode-show")}>
          {modeData.map((item: ModeDataType) => (
            <span
              key={item.value}
              onClick={() => onFilterChange("mode", item.value)}
              className={cx({
                active: filter.mode === item.value,
              })}
            >
              <i className={`${item.icon}`}></i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;
