import classNames from "classnames/bind";
import styles from "../Charts.module.scss";

const cx = classNames.bind(styles);

const ChartEmptyState = ({ height = 200 }: { height?: number }) => (
  <div className={cx("chart-empty")} style={{ height }}>
    <p>Chưa có dữ liệu để hiển thị</p>
  </div>
);

export default ChartEmptyState;
