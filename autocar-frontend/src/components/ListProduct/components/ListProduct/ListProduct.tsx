import type React from "react";
import classNames from "classnames/bind";
import styles from "./ListProduct.module.scss";
import { useCallback, useEffect, useState } from "react";
import { config } from "../../config";
import { createSlug } from "../../hooks/createSlug";

import type {
  BrandsType,
  CarType,
  ListCarType,
  ModePropsType,
} from "../../types/car";
import {
  BodyTypeCar,
  carsBrand,
  modeData,
  transmissions,
} from "../../data/carsData";
import { Button } from "../Button/Button";
import EmptyData from "../EmtyData/EmptyData";
import { useCarsFilter } from "../../hooks/useCarsFilter";
import LoadingData from "../LoadingData/LoadingData";

const cx = classNames.bind(styles);

const ListProduct: React.FC<ListCarType> = ({
  hiddenBtn = false,
  productData,
  heading,
  desc,
  className,
  filterCar,
  emptyTitle,
  userLayout,
}) => {
  const [openFilterMobile, setOpenFilterMobile] = useState<boolean>(false);
  const [closeFilterMobile, setCloseFilterMobile] = useState<boolean>(false);
  const { cars, filter, onFilterChange, onReset } = useCarsFilter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const onHandleAllProduct = useCallback(() => {
    window.location.href = config.Routes.ProductSold;
  }, []);
  const onHandleCheckDetail = useCallback((car: CarType) => {
    if (!car) return;
    localStorage.setItem("carActive", JSON.stringify(car));
  }, []);

  const onHandleCloseFilter = useCallback(() => {
    setCloseFilterMobile(true);
    setTimeout(() => {
      setCloseFilterMobile(false);
      setOpenFilterMobile(false);
    }, 350);
  }, []);
  const carsDisplay = productData ?? cars;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) return <LoadingData message="Đang tải dữ liệu" />;

  return (
    <div className={cx("products-inner")}>
      <div className={cx("product-content")}>
        <div className={cx("product-content-top", className)}>
          <div
            className={cx("left")}
            style={className ? { padding: "20px 0px " } : {}}
          >
            <h2>{heading}</h2>
            <p>{desc}</p>
          </div>
          {!hiddenBtn && (
            <div className={cx("right")}>
              <div className={cx("btn-act-all")} onClick={onHandleAllProduct}>
                <span>Xem tất cả</span>
                <span>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
                <div className={cx("slideLoad")}></div>
              </div>
            </div>
          )}
        </div>
        <div
          className={cx("product-content-bottom", { userLayout })}
          style={filterCar ? { display: "flex", gap: "25px" } : {}}
        >
          <div
            className={cx("modal-filter", { openModal: openFilterMobile })}
            onClick={onHandleCloseFilter}
          ></div>
          {filterCar && (
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
                    {carsBrand.map((brand: BrandsType, idx: number) => (
                      <option value={brand.title} key={idx}>
                        {brand.title}
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
                    {BodyTypeCar.map((item, idx: number) => (
                      <option value={item} key={idx}>
                        {item}
                      </option>
                    ))}
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
                    onChange={(e) =>
                      onFilterChange("transmission", e.target.value)
                    }
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
          )}
          <div className={cx("list-product", { filterFix1: filterCar })}>
            {filterCar && (
              <div className={cx("filter-heading")}>
                <div
                  className={cx("filter-mobile")}
                  onClick={() => setOpenFilterMobile((prev) => !prev)}
                >
                  <span>
                    <i className="fa-solid fa-filter"></i>
                  </span>
                  <span>Bộ lọc</span>
                </div>
                <div className={cx("info-show")}>
                  <div className={cx("left")}>{cars.length} xe tìm thấy</div>
                  <div className={cx("right")}>
                    <span onClick={onReset}>
                      <i className="fa-solid fa-retweet"></i>
                    </span>
                    <select
                      name="yearSX"
                      id="yearSX"
                      onChange={(e) => onFilterChange("sort", e.target.value)}
                      value={filter.sort}
                    >
                      <option value="year-max">Năm mới nhất</option>
                      <option value="year-min">Năm cũ nhất</option>
                      <option value="price-asc">Giá từ thấp đến cao</option>
                      <option value="price-desc">Giá từ cao đến thấp</option>
                      <option value="km-desc">Nhiều Km nhất</option>
                      <option value="km-asc">Ít Km nhất</option>
                    </select>
                    <div className={cx("mode-show")}>
                      {modeData.map((item: ModePropsType, idx: number) => (
                        <span
                          key={idx}
                          onClick={() => onFilterChange("mode", item.value)}
                          className={cx(
                            `${filter.mode === item.value ? "active" : ""}`,
                          )}
                        >
                          {item.icon}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {((filter.brand && filter.brand !== "Hãng xe") ||
                  (filter.transmission && filter.transmission !== "Tất cả") ||
                  (filter.bodyType && filter.bodyType !== "Tất cả loại")) && (
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
                    {filter.transmission &&
                      filter.transmission !== "Tất cả" && (
                        <div className={cx("item")}>
                          <span>Hộp số: {filter.transmission}</span>
                          <div
                            onClick={() => onFilterChange("transmission", "")}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
            {carsDisplay.length > 0 ? (
              carsDisplay.map((car: CarType, idx: number) => (
                <div
                  className={cx(
                    "product-item",
                    { filterFix2: filterCar },
                    { userLayout },
                    { changeItem: filter.mode === "list" },
                  )}
                  key={idx}
                  data-aos="zoom-in"
                >
                  <div className={cx("product-item__img", { userLayout })}>
                    <img src={car.image} alt={car.name} />
                    <div className={cx("info-img")}>
                      <div className={cx("left", { userLayout })}>
                        <div>
                          <span>
                            <i className="fa-solid fa-user-shield"></i>
                          </span>
                          <span>Bảo hành</span>
                        </div>
                        <div>
                          <span>
                            <i className="fa-solid fa-square-check"></i>
                          </span>
                          <span>Đã kiểm định</span>
                        </div>
                      </div>
                      <div className={cx("right")}>{car.brand}</div>
                    </div>
                  </div>
                  <div className={cx("product-item__info")}>
                    <h4 className={cx("title", { userLayout })}>{car.name}</h4>
                    <p className={cx("price", { userLayout })}>
                      {car.price.toLocaleString("vi-VN")} VNĐ
                    </p>
                    <div className={cx("highlight")}>
                      <div className={cx("highlight-item")}>
                        <p>
                          <i className="fa-regular fa-calendar"></i>
                        </p>
                        <p>{car.year}</p>
                        <p>Năm SX</p>
                      </div>
                      <div className={cx("highlight-item")}>
                        <p>
                          <i className="fa-solid fa-gauge-high"></i>
                        </p>
                        <p>{car.mileage.toLocaleString("vi-VN")}</p>
                        <p>Số Km</p>
                      </div>
                      <div className={cx("highlight-item")}>
                        <p>
                          <i className="fa-solid fa-gears"></i>
                        </p>
                        <p>{car.transmission}</p>
                        <p>Hộp số</p>
                      </div>
                    </div>
                    <Button
                      href={`/chi-tiet-san-pham/${createSlug(car.name)}`}
                      large
                      className={cx({ userLayout })}
                      onClick={() => onHandleCheckDetail(car)}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className={cx("emptyCar")}>
                {emptyTitle?.trim() ? <></> : <EmptyData />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
