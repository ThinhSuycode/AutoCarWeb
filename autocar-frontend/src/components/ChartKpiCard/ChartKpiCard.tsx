import classNames from "classnames/bind";
import styles from "./ChartKpiCard.module.scss";
import { formatCompact } from "../../page/Admin/DashboardManager/components/Charts/constant/chartData";

const cx = classNames.bind(styles);

interface ChartKpiCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  accent: "red" | "blue" | "amber" | "green" | "violet";
}

const ChartKpiCard = ({
  icon: Icon,
  label,
  value,
  accent,
}: ChartKpiCardProps) => (
  <div className={cx("kpi-card", accent)}>
    <div className={cx("kpi-icon")}>
      <Icon size={20} />
    </div>
    <div className={cx("kpi-body")}>
      <p className={cx("kpi-label")}>{label}</p>
      <p className={cx("kpi-value")}>{formatCompact(value)}</p>
    </div>
  </div>
);

export default ChartKpiCard;
