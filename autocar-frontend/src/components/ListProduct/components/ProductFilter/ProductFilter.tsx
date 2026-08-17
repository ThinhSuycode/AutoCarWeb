import classNames from "classnames/bind";
import styles from "./ProductFilter.module.scss";
import type { FilterState } from "../../../../hooks/useCarsFilter";
import {
  BodyTypeCar,
  brands,
  transmissions,
  CarBodyType,
} from "../../../../constants/carDatax";

const cx = classNames.bind(styles);

interface Props {
  openFilterMobile: boolean;
  closeFilterMobile: boolean;
  onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  filter: FilterState;
  onReset: () => void;
}

const ProductFilter = ({
  openFilterMobile,
  closeFilterMobile,
  onFilterChange,
  filter,
  onReset,
}: Props) => {
  return (
    <div
      className={cx(
        "filter-inner",
        openFilterMobile ? "openFilterMobile" : "",
        closeFilterMobile ? "closeFilterMobile" : "",
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={cx("heading")}>
        <div className={cx("left")}>
          <span>
            <i className="fa-solid fa-filter"></i>
          </span>
          <span>Bộ lọc</span>
        </div>
        {((filter.brand && filter.brand !== "Hãng xe") ||
          (filter.transmission && filter.brand == "Tất cả") ||
          (filter.bodyType && filter.bodyType !== "Tất cả loại")) && (
          <div className={cx("right")} onClick={onReset}>
            Xoá tất cả
          </div>
        )}
      </div>
      <div className={cx("content")}>
        <div className={cx("form-filter")}>
          <p>Hãng xe</p>
          <select
            name="brands"
            id="brands"
            onChange={(e) => onFilterChange("brand", e.target.value)}
            value={filter.brand}
          >
            <option value="Hãng xe">Hãng xe</option>
            {brands.map((brand) => (
              <option value={brand.label} key={brand.key}>
                {brand.label}
              </option>
            ))}
          </select>
        </div>
        <div className={cx("form-filter")}>
          <p>Loại xe</p>
          <select
            name="type"
            id="type"
            onChange={(e) => onFilterChange("bodyType", e.target.value)}
            value={filter.bodyType}
          >
            <option value={"Tất cả loại"}>{"Tất cả loại"}</option>
            {BodyTypeCar.map((item, idx: number) => {
              const BODY_TYPE_VALUE = CarBodyType[item];
              return (
                <option value={item} key={idx}>
                  {BODY_TYPE_VALUE}
                </option>
              );
            })}
          </select>
        </div>
        <div className={cx("form-filter")}>
          <p>Khoảng giá (Triệu VND) </p>
          <input
            type="number"
            placeholder="Từ"
            onChange={(e) => onFilterChange("priceMin", e.target.value)}
            value={filter.priceMin}
          />
          <input
            type="number"
            placeholder="Đến"
            value={filter.priceMax}
            onChange={(e) => onFilterChange("priceMax", e.target.value)}
          />
        </div>
        <div className={cx("form-filter")}>
          <p>Năm sản xuất</p>
          <input
            type="number"
            placeholder="Từ năm"
            onChange={(e) => onFilterChange("yearMin", e.target.value)}
            value={filter.yearMin}
          />
          <input
            type="number"
            placeholder="Đến năm"
            onChange={(e) => onFilterChange("yearMax", e.target.value)}
            value={filter.yearMax}
          />
        </div>
        <div className={cx("form-filter")}>
          <p>Hộp số</p>
          <select
            name="transmission"
            id="transmission"
            onChange={(e) => onFilterChange("transmission", e.target.value)}
            value={filter.transmission}
          >
            {transmissions.map((transmiss: string, idx: number) => (
              <option value={transmiss} key={idx}>
                {transmiss}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
