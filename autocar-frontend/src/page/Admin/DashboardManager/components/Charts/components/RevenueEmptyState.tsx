import classNames from "classnames/bind";
import styles from "../Charts.module.scss";
import { TrendingUp } from "lucide-react";

const cx = classNames.bind(styles);

const RevenueEmptyState = ({ height = 240 }: { height?: number }) => (
  <div className={cx("revenue-empty")} style={{ height }}>
    <div className={cx("revenue-empty-icon")}>
      <TrendingUp size={26} />
    </div>
    <p className={cx("revenue-empty-title")}>Chưa có doanh thu</p>
    <p className={cx("revenue-empty-subtitle")}>
      Chưa có đơn hàng nào hoàn thành trong 6 tháng gần đây
    </p>
  </div>
);

export default RevenueEmptyState;
