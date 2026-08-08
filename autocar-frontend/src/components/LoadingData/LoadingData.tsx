// LoadingData.tsx
import classNames from "classnames/bind";
import styles from "./LoadingData.module.scss";

const cx = classNames.bind(styles);

const LoadingData = ({
  message,
  color,
}: {
  message: string;
  color?: boolean;
}) => {
  return (
    <div className={cx("loading", { light: color })}>
      <div className={cx("track")}>
        <i className="fa-solid fa-car-side"></i>
        <div className={cx("road")}></div>
      </div>

      {message && <span>{message}</span>}
    </div>
  );
};

export default LoadingData;
