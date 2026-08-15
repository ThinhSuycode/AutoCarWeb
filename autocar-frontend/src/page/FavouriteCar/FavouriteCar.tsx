import classNames from "classnames/bind";
import styles from "./FavouriteCar.module.scss";
import ListProduct from "../../components/ListProduct/ListProduct";
import useFavouriteCar from "./hooks/useFavouriteCar";

const cx = classNames.bind(styles);
const FavouriteCar = () => {
  const { userFavouriteCar, isLoading } = useFavouriteCar();

  return (
    <div className={cx("favouriteCar-page")}>
      <ListProduct
        heading={`Xe đã lưu (${userFavouriteCar.length})`}
        productData={userFavouriteCar}
        desc="Theo dõi xe bạn đã lưu lại"
        hiddenBtn
        userLayout
        isLoading={isLoading}
        emptyTitle="Không có sản phẩm yêu thích nào được lưu"
      ></ListProduct>
    </div>
  );
};

export default FavouriteCar;
