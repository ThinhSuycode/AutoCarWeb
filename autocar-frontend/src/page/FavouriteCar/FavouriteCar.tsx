import classNames from "classnames/bind";
import styles from "./FavouriteCar.module.scss";
import ListProduct from "../../components/ListProduct/ListProduct";
import { useEffect, useState } from "react";
import { getMeApi } from "../../services/auth.service";
import type { CarType } from "../../types/car/car.type";

const cx = classNames.bind(styles);
const FavouriteCar = () => {
  const [favouriteCar, setFavouriteCar] = useState<CarType[]>([]);
  useEffect(() => {
    const getMeData = async () => {
      const res = await getMeApi();
      if (res && res.favouriteCar) {
        setFavouriteCar(res.favouriteCar ?? []);
      }
    };
    getMeData();
  }, []);

  return (
    <div className={cx("favouriteCar-page")}>
      <ListProduct
        heading={`Xe đã lưu (${favouriteCar.length})`}
        productData={favouriteCar}
        desc="Theo dõi xe bạn đã lưu lại"
        hiddenBtn
        userLayout
        // isLoading={isLoading}
        emptyTitle="Không có sản phẩm yêu thích nào được lưu"
      ></ListProduct>
    </div>
  );
};

export default FavouriteCar;
