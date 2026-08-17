import type React from "react";
import classNames from "classnames/bind";
import styles from "./ListProduct.module.scss";
import { useCarsFilter } from "../../hooks/useCarsFilter";
import LoadingData from "../LoadingData/LoadingData";
import ProductFilter from "./components/ProductFilter/ProductFilter";
import ProductToolbar from "./components/ProductToolbar/ProductToolbar";
import ProductFilterTags from "./components/ProductFilterTag/ProductFilterTags";
import ProductCard from "./components/ProductCard/ProductCard";
import EmptyData from "../EmtyData/EmptyData";
import useProductNavigation from "./hooks/useProductNavigation";
import { useMobileFilter } from "./hooks/useMobileFilter";
import type { CarType } from "../../types/car/car.type";
import type { ListCarProps } from "./types/ListProductCar";
const cx = classNames.bind(styles);

const ListProduct: React.FC<ListCarProps> = ({
  hiddenBtn = false,
  productData,
  heading,
  desc,
  className,
  filterCar,
  emptyTitle,
  userLayout,
  carShow,
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

  const carsDisplay = productData ?? cars;

  if (isLoading) return <LoadingData message="Đang tải dữ liệu" />;

  return (
    <div className={cx("products-inner", className)}>
      <div className={cx("product-content", { userLayout })}>
        <div className={cx("product-content-top")}>
          <div className={cx("left")}>
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
          <div className={cx("content")}>
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
            <div
              className={cx(
                "list-product",
                { filterFix1: filterCar },
                { changeItem: filter.mode === "list" },
                {
                  empty: carsDisplay.length === 0,
                },
              )}
            >
              {carsDisplay.length > 0 ? (
                carsDisplay.map((car: CarType) => (
                  <ProductCard
                    key={car._id}
                    userLayout={userLayout}
                    changeItem={filter.mode === "list"}
                    car={car}
                  ></ProductCard>
                ))
              ) : (
                <div className={cx("emptyCar")}>
                  {emptyTitle?.trim() ? (
                    <></>
                  ) : (
                    <EmptyData className={carShow ? "home" : ""} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
