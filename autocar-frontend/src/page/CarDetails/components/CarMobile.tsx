import classNames from "classnames/bind";
import styles from "../CarDetails.module.scss";
import type { CarDetailsType } from "../../../types/car";
import type { UserType } from "../../../types/users";
import useCarActions from "../hooks/useCarActions";

const cx = classNames.bind(styles);

const CarMobile = ({
  carDetails,
  userInfo,
  isFavourite,
}: {
  carDetails: CarDetailsType;
  userInfo: UserType | undefined;
  isFavourite: boolean;
}) => {
  const { onHandleFavourite, onHandleShare } = useCarActions({
    userInfo,
    carDetails,
  });
  return (
    <div className={cx("mobile-heading")}>
      <div className={cx("heading")}>
        <div className={cx("brand")}>{carDetails.brand || "Toyota"}</div>
        <div className={cx("action")}>
          <span
            onClick={() => onHandleFavourite(carDetails.carId._id)}
            className={cx("favourite-btn", {
              activeHeart: isFavourite,
            })}
          >
            <i className="fa-regular fa-heart"></i>
          </span>
          <span className={cx("share-btn")} onClick={onHandleShare}>
            <i className="fa-solid fa-share-nodes"></i>
          </span>
        </div>
      </div>
      <div className={cx("title")}>
        {carDetails.name || "Toyota Camry 2.5Q 2023"}
      </div>
      <div className={cx("price")}>
        <p>{carDetails.price?.toLocaleString("vi-VN") || "1.250.000.000"}₫</p>
        <p>Giá đã bao gồm VAT</p>
      </div>
      <div className={cx("specs")}>
        <div>
          <span>
            <i className="fa-regular fa-calendar"></i>
          </span>
          <span>{carDetails.year || "2023"}</span>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-gauge-high"></i>
          </span>
          <span>{carDetails.mileage?.toLocaleString("vi-VN") || "0"} km</span>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-gears"></i>
          </span>
          <span>{carDetails.transmission || "Số tự động"}</span>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-location-dot"></i>
          </span>
          <span>{carDetails.location || "TP.HCM"}</span>
        </div>
      </div>
    </div>
  );
};

export default CarMobile;
