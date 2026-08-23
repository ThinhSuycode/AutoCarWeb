import classNames from "classnames/bind";
import styles from "../Charts.module.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RevenueEmptyState from "./RevenueEmptyState";
import type { RevenuePoint } from "../types/chartTypes";
import { formatRevenueTick } from "../constant/chartData";
import RevenueTooltip from "./RevenueToolTip";

const cx = classNames.bind(styles);

const RevenueChart = ({ data }: { data: RevenuePoint[] }) => (
  <div className={cx("chart-card", "wide")}>
    <div className={cx("chart-header")}>
      <div>
        <h3>Doanh thu & Xe bán được</h3>
        <p>6 tháng gần nhất</p>
      </div>
      <div className={cx("chart-legend")}>
        <span className={cx("legend-dot", "red")}></span>
        <span>Doanh thu</span>
        <span className={cx("legend-dot", "blue")}></span>
        <span>Số xe</span>
      </div>
    </div>

    {data.length === 0 ? (
      <RevenueEmptyState height={240} />
    ) : (
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="carsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="revenue"
            orientation="left"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatRevenueTick}
            tickCount={5}
          />
          <YAxis
            yAxisId="cars"
            orientation="right"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            tickFormatter={(v) => `${Math.round(v)} xe`}
          />
          <Tooltip content={<RevenueTooltip />} />
          <Area
            yAxisId="revenue"
            type="monotone"
            dataKey="revenue"
            stroke="#dc2626"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={{ fill: "#dc2626", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Area
            yAxisId="cars"
            type="monotone"
            dataKey="cars"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#carsGradient)"
            dot={{ fill: "#3b82f6", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default RevenueChart;
