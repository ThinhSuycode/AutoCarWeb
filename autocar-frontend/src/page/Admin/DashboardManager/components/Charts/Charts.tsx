import classNames from "classnames/bind";
import styles from "./Charts.module.scss";
import {
  Car,
  Users,
  UserCog,
  Newspaper,
  CalendarCheck,
  Clock,
} from "lucide-react";

import RevenueChart from "./components/RevenueChart";
import AppointmentStatusChart from "./components/AppointmentStatusChart";
import CarBrandChart from "./components/CarBrandChart";
import NewUsersChart from "./components/NewUsersChart";
import ChartsSkeleton from "./components/ChartSkeleton";
import { DAYS, getStatusMeta } from "./constant/chartData";
import ChartKpiCard from "../../../../../components/ChartKpiCard/ChartKpiCard";
import type { AdminDashboardStats } from "../../../../../types/dashboard/dashboard.type";

const cx = classNames.bind(styles);

const Charts = ({ stats }: { stats: AdminDashboardStats | null }) => {
  if (!stats) return <ChartsSkeleton />;

  const { charts } = stats;

  const revenueData = charts.revenueStats.map((item) => ({
    month: `T${item._id.month}`,
    revenue: item.revenue,
    cars: item.cars,
  }));

  const appointmentStatusData = charts.appointmentStatusStats.map((item) => {
    const meta = getStatusMeta(item._id);
    return {
      name: item._id,
      label: meta.label,
      value: item.value,
      color: meta.color,
    };
  });

  const carBrandData = charts.carBrandStats.map((item) => ({
    brand: item._id,
    count: item.count,
  }));

  const newUsersData = charts.newUsersStats.map((item) => ({
    day: DAYS[item._id],
    users: item.users,
  }));

  return (
    <div className={cx("charts-wrapper")}>
      {/* ─── KPI Cards ─── */}
      <div className={cx("kpi-row")}>
        <ChartKpiCard
          icon={Car}
          label="Tổng số xe"
          value={stats.totalCars}
          accent="red"
        />
        <ChartKpiCard
          icon={Users}
          label="Khách hàng"
          value={stats.totalUsers}
          accent="blue"
        />
        <ChartKpiCard
          icon={UserCog}
          label="Nhân viên"
          value={stats.totalStaff}
          accent="violet"
        />
        <ChartKpiCard
          icon={Newspaper}
          label="Bài viết"
          value={stats.totalArticles}
          accent="green"
        />
        <ChartKpiCard
          icon={CalendarCheck}
          label="Tổng lịch hẹn"
          value={stats.totalAppointments}
          accent="blue"
        />
        <ChartKpiCard
          icon={Clock}
          label="Chờ duyệt"
          value={stats.pendingAppointments}
          accent="amber"
        />
      </div>

      {/* Row 1: Revenue + Appointment status */}
      <div className={cx("charts-row")}>
        <RevenueChart data={revenueData} />
        <AppointmentStatusChart data={appointmentStatusData} />
      </div>

      {/* Row 2: Car brand + New users */}
      <div className={cx("charts-row")}>
        <CarBrandChart data={carBrandData} />
        <NewUsersChart data={newUsersData} />
      </div>
    </div>
  );
};

export default Charts;
