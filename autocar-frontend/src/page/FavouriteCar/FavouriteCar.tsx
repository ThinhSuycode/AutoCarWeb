import classNames from "classnames/bind";
import styles from "./FavouriteCar.module.scss";
import ListProduct from "../../components/ListProduct/ListProduct";
import { useEffect, useState } from "react";
import { callApi } from "../../services/api";
import type { CarType } from "../../types/car";
import type { UserType } from "../../types/users";
import { getMeApi } from "../../services/auth.service";
import type { PaginatedResponse } from "../../types/pagination";

const cx = classNames.bind(styles);
const FavouriteCar = () => {
  const [favouriteCar, setFavouriteCar] = useState<CarType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLogin = !!localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      if (!isLogin) return;
      try {
        const fetchUserData = getMeApi() as Promise<UserType>;
        const fetchCarData =
          await callApi.getData<PaginatedResponse<CarType>>("cars?all=true");
        const [userData, carData] = await Promise.all([
          fetchUserData,
          fetchCarData,
        ]);

        if (carData && Array.isArray(carData.data)) {
          const favouriteList = carData.data.filter((car: CarType) =>
            userData.favouriteCar?.includes(car._id || ""),
          );
          setFavouriteCar(favouriteList);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isLogin]);

  return (
    <div className={cx("favouriteCar-page")}>
      <ListProduct
        heading={`Xe đã lưu (${favouriteCar.length})`}
        productData={favouriteCar}
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
