import classNames from "classnames/bind";
import styles from "./Charts.module.scss";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

import { callApi } from "../../../../../services/api";
import type { DashboardResponse } from "../../../../../types/dashboard/dashboard.response";

const cx = classNames.bind(styles);

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const RevenueTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={cx("tooltip")}>
      <p className={cx("tooltip-label")}>{label}</p>
      <p className={cx("tooltip-value", "red")}>
        {(payload[0]?.value / 1000000000).toFixed(1)} tỷ VNĐ
      </p>
      <p className={cx("tooltip-value", "blue")}>
        {payload[1]?.value} xe bán được
      </p>
    </div>
  );
};

const UsersTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={cx("tooltip")}>
      <p className={cx("tooltip-label")}>{label}</p>
      <p className={cx("tooltip-value", "blue")}>
        {payload[0]?.value} người dùng mới
      </p>
    </div>
  );
};

const tranformStatusTitle = (message: string) => {
  if (!message) return;
  if (message === "confirm") {
    return "Xác nhận";
  }
  if (message === "cancelled") {
    return "Huỷ bỏ";
  }
  if (message === "pending") {
    return "Chờ duyệt";
  }
  if (message === "completed") {
    return "Hoàn thành";
  }
};
// ─── Component ────────────────────────────────────────────────────────────────
const Charts = () => {
  const [chartData, setChartData] = useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const response =
          await callApi.getData<DashboardResponse>("dashboard/stats");

        setChartData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  const revenueData =
    chartData?.data.charts.revenueStats.map((item) => ({
      month: `T${item._id.month}`,
      revenue: item.revenue,
      cars: item.cars,
    })) || [];
  const appointmentStatusData =
    chartData?.data.charts.appointmentStatusStats.map((item) => ({
      name: item._id,
      value: item.value,

      color:
        item._id === "pending"
          ? "#f59e0b"
          : item._id === "confirmed"
            ? "#3b82f6"
            : item._id === "completed"
              ? "#22c55e"
              : "#ef4444",
    })) || [];
  const carBrandData =
    chartData?.data.charts.carBrandStats.map((item) => ({
      brand: item._id,
      count: item.count,
    })) || [];
  const DAYS = ["", "CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const newUsersData =
    chartData?.data.charts.newUsersStats.map((item) => ({
      day: DAYS[item._id],
      users: item.users,
    })) || [];
  return (
    <div className={cx("charts-wrapper")}>
      {/* Row 1: Area chart + Pie chart */}
      <div className={cx("charts-row")}>
        {/* Doanh thu theo tháng */}
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
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={revenueData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
                tickFormatter={(v) => `${(v / 1000000000).toFixed(0)}tỷ`}
              />
              <YAxis
                yAxisId="cars"
                orientation="right"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}xe`}
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
        </div>

        {/* Lịch hẹn theo trạng thái */}
        <div className={cx("chart-card")}>
          <div className={cx("chart-header")}>
            <div>
              <h3>Lịch hẹn</h3>
              <p>Phân bổ theo trạng thái</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={appointmentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {appointmentStatusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} lịch`, name]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e9ecef",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className={cx("pie-legend")}>
            {appointmentStatusData.map((item) => (
              <div key={item.name} className={cx("pie-legend-item")}>
                <span
                  className={cx("pie-dot")}
                  style={{ background: item.color }}
                />
                <span className={cx("pie-name")}>
                  {tranformStatusTitle(item.name)}
                </span>
                <span className={cx("pie-value")}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Bar chart + Bar chart */}
      <div className={cx("charts-row")}>
        {/* Xe theo hãng */}
        <div className={cx("chart-card")}>
          <div className={cx("chart-header")}>
            <div>
              <h3>Xe theo hãng</h3>
              <p>Phân bổ kho xe hiện tại</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={carBrandData}
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
                {carBrandData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      index === 0
                        ? "#dc2626"
                        : index === 1
                          ? "#ef4444"
                          : "#fca5a5"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Người dùng mới trong tuần */}
        <div className={cx("chart-card")}>
          <div className={cx("chart-header")}>
            <div>
              <h3>Người dùng mới</h3>
              <p>7 ngày qua</p>
            </div>
            <div className={cx("total-badge")}>
              Tổng: {newUsersData.reduce((s, d) => s + d.users, 0)} người
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={newUsersData}
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
              />
              <Tooltip content={<UsersTooltip />} />
              <Bar
                dataKey="users"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                barSize={28}
              >
                {newUsersData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.users ===
                      Math.max(...newUsersData.map((d) => d.users))
                        ? "#1d4ed8"
                        : "#93c5fd"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
