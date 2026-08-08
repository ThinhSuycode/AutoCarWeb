import classNames from "classnames/bind";
import styles from "./CarHeader.module.scss";
import useCarActions from "../../hooks/useCarActions";
import type { CarDetailsType } from "../../../../types/car/car-detail.type";
import type { UserType } from "../../../../types/user/user.type";
const cx = classNames.bind(styles);

const CarHeader = ({
  carDetails,
  userInfo,
  isFavourite,
}: {
  carDetails: CarDetailsType;
  userInfo: UserType | undefined | null;
  isFavourite: boolean | undefined;
}) => {
  const { onHandleFavourite, onHandleShare } = useCarActions({
    userInfo,
    carDetails,
  });
  return (
    <div className={cx("content-top")}>
      <div className={cx("heading")}>
        <div className={cx("brand")}>{carDetails.carId.brand || "Toyota"}</div>
        <div className={cx("action")}>
          <span
            onClick={onHandleFavourite}
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
        {carDetails.carId.name || "Toyota Camry 2.5Q 2023"}
      </div>
      <div className={cx("price")}>
        <p>
          {carDetails.carId.price?.toLocaleString("vi-VN") || "1.250.000.000"}₫
        </p>
        <p>Giá đã bao gồm VAT</p>
      </div>
      <div className={cx("specs")}>
        <div>
          <span>
            <i className="fa-regular fa-calendar"></i>
          </span>
          <span>{carDetails.carId.year || "2023"}</span>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-gauge-high"></i>
          </span>
          <span>
            {carDetails.carId.mileage?.toLocaleString("vi-VN") || "0"} km
          </span>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-gears"></i>
          </span>
          <span>{carDetails.carId.transmission || "Số tự động"}</span>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-location-dot"></i>
          </span>
          <span>{carDetails.location || "TP.HCM"}</span>
        </div>
      </div>
      <div className={cx("commitments")}>
        <div>
          <span>
            <i className="fa-solid fa-circle-check"></i>
          </span>
          <span>Cam kết không đâm đụng, ngập nước</span>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-circle-check"></i>
          </span>
          <span>Bảo hành động cơ & hộp số 12 tháng</span>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-circle-check"></i>
          </span>
          <span>Hỗ trợ trả góp lên đến 70%</span>
        </div>
      </div>
    </div>
  );
};

export default CarHeader;
