import classNames from "classnames/bind";
import styles from "./ResultItem.module.scss";
import type { CarType } from "../../../../../../../types/car/car.type";
import { formatPrice } from "../../../../../../../hooks/formatPrice";
import { createSlug } from "../../../../../../../utils/slug";

const cx = classNames.bind(styles);

const ResultItem = ({ car }: { car: CarType }) => {
  return (
    <a
      href={`/chi-tiet-san-pham/${car._id}/${createSlug(car.name)}`}
      className={cx("item")}
      key={car._id}
    >
      <div className={cx("image-wrapper")}>
        <img src={car.thumbnail} alt={car.name} />
      </div>
      <div className={cx("info-wrapper")}>
        <h4 className={cx("name")}>{car.name}</h4>
        <p className={cx("brand")}>{car.brand}</p>
        <p className={cx("price")}>{formatPrice(car.price)}</p>
      </div>
    </a>
  );
};

export default ResultItem;
