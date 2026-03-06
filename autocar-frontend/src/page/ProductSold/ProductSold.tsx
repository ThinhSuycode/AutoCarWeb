import classNames from "classnames/bind";
import styles from "./ProductSold.module.scss";
import ListProduct from "../../components/ListProduct/ListProduct";
import { useEffect, useState } from "react";
import type { Car } from "../../services/data/carsData";
import { callApi } from "../../services/api";

const cx = classNames.bind(styles);
const ProductSold = () => {
  const [carDataSold, setCarDataSold] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callApi.getData("carData");
        setCarDataSold(data);
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
        productsData={carDataSold}
        desc={`Khám phá ${carDataSold.length} xe chất lượng cao`}
        className={cx("bg-heading")}
        filterCar
        hiddenBtn
      ></ListProduct>
    </div>
  );
};

export default ProductSold;
