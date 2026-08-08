import classNames from "classnames/bind";
import styles from "./EmptyData.module.scss";
const cx = classNames.bind(styles);

interface Props {
  title?: string;
  description?: string;
}

const EmptyData = ({ title, description }: Props) => {
  return (
    <div className={cx("empty-data")}>
      <div className={cx("icon-wrapper")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125h4.5m-8.086-6.375h11.172c.917 0 1.699.663 1.85 1.567l.164.983H2.55l.164-.983a1.875 1.875 0 011.85-1.567z"
          />
        </svg>
      </div>
      <span className={cx("title")}>
        {title || "Sản phẩm hiện không có ở cửa hàng"}
      </span>
      <span className={cx("subtitle")}>
        {description || "Vui lòng quay lại sau hoặc chọn sản phẩm khác"}
      </span>
    </div>
  );
};

export default EmptyData;
