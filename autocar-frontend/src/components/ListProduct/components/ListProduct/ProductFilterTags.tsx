import React from "react";
import classNames from "classnames/bind";
import styles from "../../ListProduct.module.scss";
import type { FilterState } from "../../../../hooks/useCarsFilter";

const cx = classNames.bind(styles);

interface Props {
  filter: FilterState;
  onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
}

const ProductFilterTags: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <div className={cx("list-filter")}>
      {filter.brand && filter.brand !== "Hãng xe" && (
        <div className={cx("item")}>
          <span>Hãng: {filter.brand}</span>

          <div onClick={() => onFilterChange("brand", "")}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}

      {filter.bodyType && filter.bodyType !== "Tất cả loại" && (
        <div className={cx("item")}>
          <span>Loại: {filter.bodyType}</span>

          <div onClick={() => onFilterChange("bodyType", "")}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}

      {filter.transmission && filter.transmission !== "Tất cả" && (
        <div className={cx("item")}>
          <span>Hộp số: {filter.transmission}</span>

          <div onClick={() => onFilterChange("transmission", "")}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilterTags;
