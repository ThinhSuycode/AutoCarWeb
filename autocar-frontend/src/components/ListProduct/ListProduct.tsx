import type React from "react";
import classNames from "classnames/bind";
import styles from "./ListProduct.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CarType, ListCarType } from "../../types/car";
import { useCarsFilter } from "../../hooks/useCarsFilter";
import LoadingData from "../LoadingData/LoadingData";
import ProductFilter from "./components/ListProduct/ProductFilter";
import ProductToolbar from "./components/ListProduct/ProductToolbar";
import ProductFilterTags from "./components/ListProduct/ProductFilterTags";
import ProductCard from "./components/ListProduct/ProductCard";
import EmptyData from "../EmtyData/EmptyData";
import useProductNavigation from "./hooks/useProductNavigation";
import { useMobileFilter } from "./hooks/useMobileFilter";

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
  isLoading,
}) => {
  const { cars, filter, onFilterChange, onReset } = useCarsFilter();
  const { onHandleAllProduct } = useProductNavigation();
  const {
    openFilterMobile,
    closeFilterMobile,
    closeFilter,
    setOpenFilterMobile,
  } = useMobileFilter();

  const carsDisplay = useMemo(() => productData ?? cars, [productData, cars]);

  if (isLoading) return <LoadingData message="Đang tải dữ liệu" />;

  return (
    <div className={cx("products-inner")}>
      <div className={cx("product-content", { userLayout })}>
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
          style={filterCar ? { display: "flex", gap: "25px" } : {}}
        >
          <div
            className={cx("modal-filter", { openModal: openFilterMobile })}
            onClick={closeFilter}
          ></div>
          {filterCar && (
            <ProductFilter
              openFilterMobile={openFilterMobile}
              closeFilterMobile={closeFilterMobile}
              filter={filter}
              onFilterChange={onFilterChange}
              onReset={onReset}
            />
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
                <ProductToolbar
                  count={cars.length}
                  onFilterChange={onFilterChange}
                  onReset={onReset}
                  filter={filter}
                ></ProductToolbar>
                <ProductFilterTags
                  filter={filter}
                  onFilterChange={onFilterChange}
                ></ProductFilterTags>
              </div>
            )}
            {carsDisplay.length > 0 ? (
              carsDisplay.map((car: CarType) => (
                <ProductCard
                  filterCar={!!filterCar}
                  key={car._id}
                  userLayout={userLayout}
                  filter={filter}
                  car={car}
                ></ProductCard>
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
