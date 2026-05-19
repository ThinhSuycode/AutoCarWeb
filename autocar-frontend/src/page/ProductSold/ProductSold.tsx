import classNames from "classnames/bind";
import styles from "./ProductSold.module.scss";
import ListProduct from "../../components/ListProduct/ListProduct";
import { useEffect, useState } from "react";
import { callApi } from "../../services/api";
import type { CarType } from "../../types/car";
import type { PaginatedResponse } from "../../types/pagination";

const cx = classNames.bind(styles);
const ProductSold = () => {
  const [carDataSold, setCarDataSold] = useState<CarType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          await callApi.getData<PaginatedResponse<CarType>>("cars?all=true");
        setCarDataSold(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={cx("productSold-inner")}>
      <ListProduct
        heading="Xe đang bán"
        desc={`Khám phá ${carDataSold.length} xe chất lượng cao`}
        className={cx("bg-heading")}
        filterCar
        hiddenBtn
      ></ListProduct>
    </div>
  );
};

export default ProductSold;
