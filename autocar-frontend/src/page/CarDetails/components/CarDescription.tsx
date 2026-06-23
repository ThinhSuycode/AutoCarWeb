import classNames from "classnames/bind";
import styles from "../CarDetails.module.scss";

const cx = classNames.bind(styles);

const CarDescription = ({ description }: { description: string }) => {
  return (
    <div className={cx("car-description")}>
      <h3>Mô tả chi tiết</h3>
      <p>{description}</p>
    </div>
  );
};

export default CarDescription;
