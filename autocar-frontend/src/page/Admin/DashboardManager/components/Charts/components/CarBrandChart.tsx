import classNames from "classnames/bind";
import styles from "../Charts.module.scss";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartEmptyState from "./ChartEmptyState";
import type { CarBrandPoint } from "../types/chartTypes";

const cx = classNames.bind(styles);

const CarBrandChart = ({ data }: { data: CarBrandPoint[] }) => (
  <div className={cx("chart-card")}>
    <div className={cx("chart-header")}>
      <div>
        <h3>Xe theo hãng</h3>
        <p>Phân bổ kho xe hiện tại</p>
      </div>
    </div>

    {data.length === 0 ? (
      <ChartEmptyState height={220} />
    ) : (
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="brand"
            tick={{ fontSize: 12, fill: "#334155" }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip
            formatter={(v) => [`${v} xe`, "Số lượng"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e9ecef",
              fontSize: "12px",
            }}
          />
          <Bar
            dataKey="count"
            fill="#dc2626"
            radius={[0, 6, 6, 0]}
            barSize={14}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  index === 0 ? "#dc2626" : index === 1 ? "#ef4444" : "#fca5a5"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default CarBrandChart;
