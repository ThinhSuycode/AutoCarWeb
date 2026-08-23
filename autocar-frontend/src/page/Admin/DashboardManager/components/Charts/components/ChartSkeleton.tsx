import classNames from "classnames/bind";
import styles from "../Charts.module.scss";

const cx = classNames.bind(styles);

const ChartsSkeleton = () => (
  <div className={cx("charts-wrapper")}>
    <div className={cx("kpi-row")}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={cx("kpi-card", "skeleton")} />
      ))}
    </div>
    <div className={cx("charts-row")}>
      <div
        className={cx("chart-card", "wide", "skeleton")}
        style={{ height: 280 }}
      />
      <div className={cx("chart-card", "skeleton")} style={{ height: 280 }} />
    </div>
    <div className={cx("charts-row")}>
      <div className={cx("chart-card", "skeleton")} style={{ height: 260 }} />
      <div className={cx("chart-card", "skeleton")} style={{ height: 260 }} />
    </div>
  </div>
);

export default ChartsSkeleton;
