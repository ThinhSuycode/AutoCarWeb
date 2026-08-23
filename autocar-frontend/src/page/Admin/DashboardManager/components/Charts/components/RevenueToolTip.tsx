import classNames from "classnames/bind";
import styles from "../Charts.module.scss";
import { formatRevenue } from "../constant/chartData";

const cx = classNames.bind(styles);

const RevenueTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={cx("tooltip")}>
      <p className={cx("tooltip-label")}>{label}</p>
      <p className={cx("tooltip-value", "red")}>
        {formatRevenue(payload[0]?.value ?? 0)}
      </p>
      <p className={cx("tooltip-value", "blue")}>
        {payload[1]?.value} xe bán được
      </p>
    </div>
  );
};

export default RevenueTooltip;
