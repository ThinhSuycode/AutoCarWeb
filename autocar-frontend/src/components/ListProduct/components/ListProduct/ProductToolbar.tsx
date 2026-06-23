import React from "react";
import classNames from "classnames/bind";

import styles from "../../ListProduct.module.scss";
import { modeData } from "../../../../data/carsData";
import type { FilterState } from "../../../../hooks/useCarsFilter";

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
          <option value="year-max">Năm mới nhất</option>
          <option value="year-min">Năm cũ nhất</option>
          <option value="price-asc">Giá thấp đến cao</option>
          <option value="price-desc">Giá cao đến thấp</option>
          <option value="km-desc">Nhiều Km nhất</option>
          <option value="km-asc">Ít Km nhất</option>
        </select>

        <div className={cx("mode-show")}>
          {modeData.map((item, idx) => (
            <span
              key={idx}
              onClick={() => onFilterChange("mode", item.value)}
              className={cx({
                active: filter.mode === item.value,
              })}
            >
              {item.icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;
