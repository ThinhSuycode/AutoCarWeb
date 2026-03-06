import classNames from "classnames/bind";
import styles from "./FavouriteCar.module.scss";
import ListProduct from "../../components/ListProduct/ListProduct";
import { useEffect, useState } from "react";
import { callApi } from "../../services/api";
import type { CarType } from "../../types/car";
import type { CustomerType } from "../../types/customer";

const cx = classNames.bind(styles);
const FavouriteCar = () => {
  const [favouriteCar, setFavouriteCar] = useState<CarType[]>([]);
  const [customerEmail] = useState<string>(() => {
    const cus = localStorage.getItem("accountActive");
    return cus ? JSON.parse(cus) : "";
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchCustomerData = customerEmail
          ? callApi.getData("customer")
          : Promise.resolve(null);
        const fetchCarData = callApi.getData("carData");
        const [customerData, carData] = await Promise.all([
          fetchCustomerData,
          fetchCarData,
        ]);

        if (customerData && Array.isArray(customerData)) {
          const customerActive = customerData.find(
            (cus: CustomerType) => cus.email === customerEmail,
          );

          if (customerActive && carData && Array.isArray(carData)) {
            const favourite = carData.filter((car: CarType) =>
              customerActive.favouriteCar?.includes(car.id),
            );
            setFavouriteCar(favourite);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [customerEmail]);

  return (
    <div className={cx("favouriteCar-page")}>
      <ListProduct
        heading={`Xe đã lưu (${favouriteCar.length})`}
        productsData={favouriteCar}
        hiddenBtn
      ></ListProduct>
    </div>
  );
};

export default FavouriteCar;
