import classNames from "classnames/bind";
import styles from "./DashBoard.module.scss";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const cx = classNames.bind(styles);

// ─────────────────────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────────────────────

const appointmentData = [
  { day: "T2", total: 4 },
  { day: "T3", total: 7 },
  { day: "T4", total: 5 },
  { day: "T5", total: 9 },
  { day: "T6", total: 6 },
  { day: "T7", total: 10 },
  { day: "CN", total: 3 },
];

const appointmentStatus = [
  { name: "Chờ xác nhận", value: 8, color: "#f59e0b" },
  { name: "Đã xác nhận", value: 15, color: "#3b82f6" },
  { name: "Hoàn thành", value: 21, color: "#22c55e" },
  { name: "Đã huỷ", value: 3, color: "#ef4444" },
];

const customerCareData = [
  { month: "T1", customers: 24 },
  { month: "T2", customers: 32 },
  { month: "T3", customers: 28 },
  { month: "T4", customers: 36 },
  { month: "T5", customers: 42 },
  { month: "T6", customers: 38 },
];

const recentAppointments = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    car: "Toyota Camry",
    date: "20/05/2026",
    time: "09:30",
    status: "pending",
  },
  {
    id: 2,
    customer: "Trần Minh B",
    car: "Mazda CX5",
    date: "20/05/2026",
    time: "13:00",
    status: "confirmed",
  },
  {
    id: 3,
    customer: "Lê Quốc C",
    car: "Ford Everest",
    date: "21/05/2026",
    time: "15:30",
    status: "completed",
  },
];

const STATUS_MAP: Record<
  string,
  {
    label: string;
    cls: string;
  }
> = {
  pending: {
    label: "Chờ xác nhận",
    cls: "pending",
  },
  confirmed: {
    label: "Đã xác nhận",
    cls: "confirmed",
  },
  completed: {
    label: "Hoàn thành",
    cls: "completed",
  },
  cancelled: {
    label: "Đã huỷ",
    cls: "cancelled",
  },
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

const DashBoard = () => {
  return (
    <div className={cx("dashboardStaff-page")}>
      {/* Header */}
      <div className={cx("page-header")}>
        <div>
          <h2>Dashboard Nhân Viên</h2>
          <p>Theo dõi lịch hẹn và khách hàng hôm nay</p>
        </div>

        <div className={cx("date")}>
          <i className="fa-regular fa-calendar"></i>

          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Stats */}
      <div className={cx("stats-grid")}>
        <div className={cx("stat-card", "blue")}>
          <div className={cx("stat-icon")}>
            <i className="fa-regular fa-calendar-check"></i>
          </div>

          <div className={cx("stat-content")}>
            <h3>24</h3>
            <p>Lịch hẹn hôm nay</p>
          </div>
        </div>

        <div className={cx("stat-card", "green")}>
          <div className={cx("stat-icon")}>
            <i className="fa-solid fa-users"></i>
          </div>

          <div className={cx("stat-content")}>
            <h3>132</h3>
            <p>Khách hàng hỗ trợ</p>
          </div>
        </div>

        <div className={cx("stat-card", "orange")}>
          <div className={cx("stat-icon")}>
            <i className="fa-solid fa-clock"></i>
          </div>

          <div className={cx("stat-content")}>
            <h3>8</h3>
            <p>Chờ xác nhận</p>
          </div>
        </div>

        <div className={cx("stat-card", "red")}>
          <div className={cx("stat-icon")}>
            <i className="fa-solid fa-car"></i>
          </div>

          <div className={cx("stat-content")}>
            <h3>16</h3>
            <p>Lái thử hoàn thành</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className={cx("charts-grid")}>
        {/* Area Chart */}
        <div className={cx("chart-card", "large")}>
          <div className={cx("chart-header")}>
            <div>
              <h3>Lịch hẹn trong tuần</h3>
              <p>7 ngày gần nhất</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={appointmentData}>
              <defs>
                <linearGradient
                  id="appointmentGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              <XAxis dataKey="day" axisLine={false} tickLine={false} />

              <YAxis axisLine={false} tickLine={false} />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                fill="url(#appointmentGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className={cx("chart-card")}>
          <div className={cx("chart-header")}>
            <div>
              <h3>Trạng thái lịch hẹn</h3>
              <p>Phân bổ hiện tại</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={appointmentStatus}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {appointmentStatus.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className={cx("pie-legend")}>
            {appointmentStatus.map((item) => (
              <div key={item.name} className={cx("legend-item")}>
                <span
                  className={cx("dot")}
                  style={{ background: item.color }}
                ></span>

                <span>{item.name}</span>

                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className={cx("bottom-grid")}>
        {/* Recent appointments */}
        <div className={cx("table-card")}>
          <div className={cx("section-header")}>
            <h3>Lịch hẹn gần đây</h3>
          </div>

          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Xe</th>
                <th>Ngày</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {recentAppointments.map((item) => {
                const status = STATUS_MAP[item.status];

                return (
                  <tr key={item.id}>
                    <td>{item.customer}</td>

                    <td>{item.car}</td>

                    <td>
                      {item.date} - {item.time}
                    </td>

                    <td>
                      <span className={cx("status-badge", status.cls)}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Customer care chart */}
        <div className={cx("chart-card")}>
          <div className={cx("chart-header")}>
            <div>
              <h3>Khách hàng chăm sóc</h3>
              <p>6 tháng gần nhất</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={customerCareData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              <XAxis dataKey="month" axisLine={false} tickLine={false} />

              <YAxis axisLine={false} tickLine={false} />

              <Tooltip />

              <Bar dataKey="customers" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
