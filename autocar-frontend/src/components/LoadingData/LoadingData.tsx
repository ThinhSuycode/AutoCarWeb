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
    <div className={cx("loading")}>
      <i
        className="fa-solid fa-spinner"
        style={color ? { color: "cyan" } : {}}
      ></i>
      {message && (
        <span style={color ? { color: "white" } : {}}>{message}...</span>
      )}
    </div>
  );
};

export default LoadingData;
