import classNames from "classnames/bind";
import styles from "./LoadingData.module.scss";

const cx = classNames.bind(styles);
const LoadingData = () => {
  return <div className={cx("loading-car")}>Loading...</div>;
};

export default LoadingData;
