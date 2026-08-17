import classNames from "classnames/bind";
import styles from "./ProductCard.module.scss";
import { Button } from "../../../Button/Button";
import { createSlug } from "../../../../utils/slug";
import type { CarType } from "../../../../types/car/car.type";

const cx = classNames.bind(styles);

interface Props {
  car: CarType;
  changeItem?: boolean;
  userLayout: boolean | undefined;
}

const ProductCard = ({ userLayout, car, changeItem }: Props) => {
  return (
    <div className={cx("product-item", { userLayout }, { changeItem })}>
      <div className={cx("product-item__img", { userLayout })}>
        <img src={car.thumbnail} alt={car.name} />
        {car.status === "sold" && (
          <div className={cx("car-checked")}>Đã bán</div>
        )}
        <div className={cx("info-img")}>
          <div className={cx("left", { userLayout })}>
            <div>
              <span>
                <i className="fa-solid fa-user-shield"></i>
              </span>
              <span>Bảo hành</span>
            </div>
            <div>
              <span>
                <i className="fa-solid fa-square-check"></i>
              </span>
              <span>Đã kiểm định</span>
            </div>
          </div>
          <div className={cx("right")}>{car.brand}</div>
        </div>
      </div>
      <div className={cx("product-item__info")}>
        <h4 className={cx("title", { userLayout })}>{car.name}</h4>
        <p className={cx("price", { userLayout })}>
          {car.price.toLocaleString("vi-VN")} VNĐ
        </p>
        <div className={cx("highlight")}>
          <div className={cx("highlight-item")}>
            <p>
              <i className="fa-regular fa-calendar"></i>
            </p>
            <p>{car.year}</p>
            <p>Năm SX</p>
          </div>
          <div className={cx("highlight-item")}>
            <p>
              <i className="fa-solid fa-gauge-high"></i>
            </p>
            <p>{car.mileage.toLocaleString("vi-VN")}</p>
            <p>Số Km</p>
          </div>
          <div className={cx("highlight-item")}>
            <p>
              <i className="fa-solid fa-gears"></i>
            </p>
            <p>{car.transmission}</p>
            <p>Hộp số</p>
          </div>
        </div>
        <Button
          href={`/chi-tiet-san-pham/${car._id}/${createSlug(car.name)}`}
          large
          className={cx({ userLayout })}
        >
          Xem chi tiết
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
