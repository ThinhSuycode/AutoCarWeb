import classNames from "classnames/bind";
import styles from "./OrderCarSection.module.scss";

const cx = classNames.bind(styles);

type Props = {
  image: string;
  name: string;
  brand: string;
  year: number;
  price: number;
};

const OrderCarSection = ({ image, name, brand, year, price }: Props) => {
  return (
    <section className={cx("section")}>
      <h3>Thông tin xe</h3>

      <div className={cx("car-box")}>
        <img src={image} alt="" />

        <div>
          <h4>{name}</h4>

          <p>{brand}</p>

          <p>{year}</p>

          <strong>{price.toLocaleString()} VNĐ</strong>
        </div>
      </div>
    </section>
  );
};

export default OrderCarSection;
