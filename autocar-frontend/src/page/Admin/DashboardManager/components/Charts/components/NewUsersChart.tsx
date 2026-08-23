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
import type { NewUsersPoint } from "../types/chartTypes";
import UsersTooltip from "./UsersToolTip";

const cx = classNames.bind(styles);

const NewUsersChart = ({ data }: { data: NewUsersPoint[] }) => {
  const total = data.reduce((sum, d) => sum + d.users, 0);
  const max = data.length ? Math.max(...data.map((d) => d.users)) : 0;

  return (
    <div className={cx("chart-card")}>
      <div className={cx("chart-header")}>
        <div>
          <h3>Người dùng mới</h3>
          <p>7 ngày qua</p>
        </div>
        <div className={cx("total-badge")}>Tổng: {total} người</div>
      </div>

      {data.length === 0 ? (
        <ChartEmptyState height={220} />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<UsersTooltip />} />
            <Bar
              dataKey="users"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              barSize={28}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.users === max ? "#1d4ed8" : "#93c5fd"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default NewUsersChart;
