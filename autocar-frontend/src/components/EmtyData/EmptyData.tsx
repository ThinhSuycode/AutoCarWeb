import classNames from "classnames/bind";
import styles from "./EmptyData.module.scss";
const cx = classNames.bind(styles);
const EmptyData = () => {
  return (
    <div className={cx("empty-data")}>
      {/* <span>
        <i className="fa-solid fa-spinner"></i>
      </span> */}
      <span>Sản phẩm này hiện không có ở cửa hàng!!</span>
    </div>
  );
};

export default EmptyData;
