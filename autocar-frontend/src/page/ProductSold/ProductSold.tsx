import classNames from "classnames/bind";
import styles from "./ProductSold.module.scss";
import ListProduct from "../../components/ListProduct/ListProduct";
import { useProductSold } from "./hooks/useProductSold";

const cx = classNames.bind(styles);
const ProductSold = () => {
  const { carDataSold, isLoading } = useProductSold();
  return (
    <div className={cx("productSold-inner")}>
      <ListProduct
        heading="Xe đang bán"
        desc={`Khám phá ${carDataSold.length} xe chất lượng cao`}
        className={cx("bg-heading")}
        filterCar
        hiddenBtn
        isLoading={isLoading}
      ></ListProduct>
    </div>
  );
};

export default ProductSold;
