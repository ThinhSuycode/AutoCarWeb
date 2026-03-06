import type React from "react";
import {
  BodyTypeCar,
  carsBrand,
  transmissions,
  type Brands,
  type Car,
} from "../../services/data/carsData";
import Button from "../Button/Button";
import classNames from "classnames/bind";
import styles from "./ListProduct.module.scss";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { config } from "../../config";
import { createSlug } from "../../hooks/createSlug";
import EmptyData from "../EmtyData/EmptyData";

const cx = classNames.bind(styles);
interface PropsType {
  productsData: Car[] | [];
  hiddenBtn?: boolean;
  heading: string;
  className?: string;
  desc?: string;
  filterCar?: boolean;
}

interface ModeProps {
  icon: ReactNode;
  value: string;
}

const modeData: ModeProps[] = [
  {
    icon: <i className="fa-solid fa-grip"></i>,
    value: "grid",
  },
  {
    icon: <i className="fa-solid fa-list"></i>,
    value: "list",
  },
];

const ListProduct: React.FC<PropsType> = ({
  productsData,
  hiddenBtn = false,
  heading,
  desc,
  className,
  filterCar,
}) => {
  const [modeActive, setModeActive] = useState<string>("grid");
  const [brandValue, setBrandValue] = useState<string>("");
  const [typeCarValue, setTypeCarValue] = useState<string>("");
  const [transmissCarValue, setTransmissCarValue] = useState<string>("");
  const [filterData, setFilterData] = useState<Car[]>(productsData);
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [yearMin, setYearMin] = useState<string>("");
  const [yearMax, setYearMax] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("year-max");

  useEffect(() => {
    let filterCar = [...productsData];

    // Lọc theo hãng xe (chỉ lọc nếu có giá trị hợp lệ)
    if (brandValue && brandValue !== "Hãng xe") {
      filterCar = filterCar.filter((car: Car) => car.brand === brandValue);
    }

    // Lọc theo loại xe (chỉ lọc nếu có giá trị hợp lệ)
    if (typeCarValue && typeCarValue !== "Tất cả loại") {
      filterCar = filterCar.filter((car: Car) => car.bodyType === typeCarValue);
    }

    // Lọc theo hộp số (chỉ lọc nếu có giá trị hợp lệ)
    if (transmissCarValue && transmissCarValue !== "Tất cả") {
      filterCar = filterCar.filter(
        (car: Car) => car.transmission === transmissCarValue,
      );
    }

    // Lọc theo khoảng giá
    if (priceMin || priceMax) {
      const min = priceMin ? Number(priceMin) : 0;
      const max = priceMax ? Number(priceMax) : Infinity;
      filterCar = filterCar.filter(
        (car: Car) => car.price >= min && car.price <= max,
      );
    }
    if (yearMin || yearMax) {
      const min = yearMin ? Number(yearMin) : 0;
      const max = yearMax ? Number(yearMax) : Infinity;
      filterCar = filterCar.filter(
        (car: Car) => car.year >= min && car.year <= max,
      );
    }
    if (filterOption) {
      if (filterOption === "year-min") {
        filterCar = filterCar.sort((t1: Car, t2: Car) => t1.year - t2.year);
      }
      if (filterOption === "year-max") {
        filterCar = filterCar.sort((t1: Car, t2: Car) => t2.year - t1.year);
      }
      if (filterOption === "price-desc") {
        filterCar = filterCar.sort((t1: Car, t2: Car) => t2.price - t1.price);
      }
      if (filterOption === "price-asc") {
        filterCar = filterCar.sort((t1: Car, t2: Car) => t1.price - t2.price);
      }
      if (filterOption === "km-desc") {
        filterCar = filterCar.sort(
          (t1: Car, t2: Car) => t2.mileage - t1.mileage,
        );
      }
      if (filterOption === "km-asc") {
        filterCar = filterCar.sort(
          (t1: Car, t2: Car) => t1.mileage - t2.mileage,
        );
      }
    }
    setFilterData(filterCar);
  }, [
    brandValue,
    typeCarValue,
    transmissCarValue,
    productsData,
    priceMin,
    priceMax,
    yearMin,
    yearMax,
    filterOption,
  ]);

  const onHandleAllProduct = useCallback(() => {
    window.location.href = config.Routes.ProductSold;
  }, []);
  const onHandleCheckDetail = useCallback((car: Car) => {
    if (!car) return;
    localStorage.setItem("carActive", JSON.stringify(car));
  }, []);

  const onHandleResetFilter = useCallback(() => {
    setBrandValue("");
    setPriceMax("");
    setPriceMin("");
    setTypeCarValue("");
    setTransmissCarValue("");
    setYearMin("");
    setYearMax("");
  }, []);
  const onHandleChangeShowItem = useCallback((value: string) => {
    setModeActive(value);
  }, []);
  const onHandleResetSelect = useCallback(() => {
    setFilterOption("year-max");
    setModeActive("grid");
  }, []);
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
          className={cx("product-content-bottom")}
          style={filterCar ? { display: "flex" } : {}}
        >
          {filterCar && (
            <div className={cx("filter-inner")}>
              <div className={cx("heading")}>
                <div className={cx("left")}>
                  <span>
                    <i className="fa-solid fa-filter"></i>
                  </span>
                  <span>Bộ lọc</span>
                </div>
                {((brandValue && brandValue !== "Hãng xe") ||
                  (transmissCarValue && transmissCarValue !== "Tất cả") ||
                  (typeCarValue && typeCarValue !== "Tất cả loại")) && (
                  <div className={cx("right")} onClick={onHandleResetFilter}>
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
                    onChange={(e) => setBrandValue(e.target.value)}
                    value={brandValue || "Hãng xe"}
                  >
                    <option value="Hãng xe">Hãng xe</option>
                    {carsBrand.map((brand: Brands, idx: number) => (
                      <option value={brand.title} key={idx}>
                        {brand.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={cx("form-filter")}>
                  <p>Loại xe</p>
                  <select
                    name="brands"
                    id="brands"
                    value={typeCarValue || "Tất cả loại"}
                    onChange={(e) => setTypeCarValue(e.target.value)}
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
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                  />
                </div>
                <div className={cx("form-filter")}>
                  <p>Năm sản xuất</p>
                  <input
                    type="number"
                    placeholder="Từ năm"
                    onChange={(e) => setYearMin(e.target.value)}
                    value={yearMin}
                  />
                  <input
                    type="number"
                    placeholder="Đến năm"
                    onChange={(e) => setYearMax(e.target.value)}
                    value={yearMax}
                  />
                </div>
                <div className={cx("form-filter")}>
                  <p>Hộp số</p>
                  <select
                    name="brands"
                    id="brands"
                    value={transmissCarValue || "Tất cả"}
                    onChange={(e) => setTransmissCarValue(e.target.value)}
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
                <div className={cx("info-show")}>
                  <div className={cx("left")}>
                    {filterData.length} xe tìm thấy
                  </div>
                  <div className={cx("right")}>
                    <span onClick={onHandleResetSelect}>
                      <i className="fa-solid fa-retweet"></i>
                    </span>
                    <select
                      name="yearSX"
                      id="yearSX"
                      onChange={(e) => setFilterOption(e.target.value)}
                    >
                      <option value="year-max">Năm mới nhất</option>
                      <option value="year-min">Năm cũ nhất</option>
                      <option value="price-asc">Giá từ thấp đến cao</option>
                      <option value="price-desc">Giá từ cao đến thấp</option>
                      <option value="km-desc">Nhiều Km nhất</option>
                      <option value="km-asc">Ít Km nhất</option>
                    </select>
                    <div className={cx("mode-show")}>
                      {modeData.map((item: ModeProps, idx: number) => (
                        <span
                          key={idx}
                          onClick={() => onHandleChangeShowItem(item.value)}
                          className={cx(
                            `${modeActive === item.value ? "active" : ""}`,
                          )}
                        >
                          {item.icon}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {((brandValue && brandValue !== "Hãng xe") ||
                  (transmissCarValue && transmissCarValue !== "Tất cả") ||
                  (typeCarValue && typeCarValue !== "Tất cả loại")) && (
                  <div className={cx("list-filter")}>
                    {brandValue && brandValue !== "Hãng xe" && (
                      <div className={cx("item")}>
                        <span>Hãng: {brandValue}</span>
                        <span onClick={() => setBrandValue("")}>
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </div>
                    )}
                    {typeCarValue && typeCarValue !== "Tất cả loại" && (
                      <div className={cx("item")}>
                        <span>Loại: {typeCarValue}</span>
                        <span onClick={() => setTypeCarValue("")}>
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </div>
                    )}
                    {transmissCarValue && transmissCarValue !== "Tất cả" && (
                      <div className={cx("item")}>
                        <span>Hộp số: {transmissCarValue}</span>
                        <span onClick={() => setTransmissCarValue("")}>
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {filterData.length > 0 ? (
              filterData.map((car: Car, idx: number) => (
                <div
                  className={cx(
                    "product-item",
                    { filterFix2: filterCar },
                    { changeItem: modeActive === "list" },
                  )}
                  key={idx}
                  data-aos="zoom-in"
                >
                  <div className={cx("product-item__img")}>
                    <img src={car.image} alt={car.name} />
                    <div className={cx("info-img")}>
                      <div className={cx("left")}>
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
                    <h4 className={cx("title")}>{car.name}</h4>
                    <p className={cx("price")}>
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
                      onClick={() => onHandleCheckDetail(car)}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className={cx("emptyCar")}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
