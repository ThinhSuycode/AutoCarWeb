import classNames from "classnames/bind";
import styles from "./DashBoard.module.scss";
import {
  Car,
  Users,
  CalendarClock,
  ShoppingBag,
  Wallet,
  Inbox,
  Wrench,
} from "lucide-react";
import ChartKpiCard from "../../../components/ChartKpiCard/ChartKpiCard";
import TodoCard from "./components/TodoCard/TodoCard";
import StatusBreakdownBar from "./components/Statusbreakdownbar/Statusbreakdownbar";
import {
  MANAGER_STATUS_COLOR,
  MANAGER_STATUS_LABEL,
} from "../../../types/user/manager-cars.type";
import {
  CONTACT_STATUS_COLOR,
  CONTACT_STATUS_LABEL,
} from "../../../types/contact/contact.constant";
import { useStaffDashBoard } from "./hooks/useStaffDashBoard";
import LoadingData from "../../../components/LoadingData/LoadingData";
import EmptyData from "../../../components/EmtyData/EmptyData";
import { formatNumber } from "../../../components/MoneyInput/utils/useTransformInput";
import PageHeader from "../../../components/PageHeader/PageHeader";

const cx = classNames.bind(styles);

const DashBoard = () => {
  const { stats, isLoading } = useStaffDashBoard();
  if (isLoading) {
    return <LoadingData message="Đang tải..."></LoadingData>;
  }
  if (!stats) {
    return (
      <EmptyData
        title="Không tìm thấy dữ liệu"
        description="Vui lòng kiểm tra lại"
      ></EmptyData>
    );
  }

  return (
    <div className={cx("wrapper")}>
      <PageHeader
        title="DashBoard"
        description="Xem tổng quan nhiệm vụ của nhân viên"
      ></PageHeader>
      <div className={cx("kpi-row")}>
        <ChartKpiCard
          icon={Car}
          label="Xe đang phụ trách"
          value={stats?.assignedCars}
          accent="red"
        />
        <ChartKpiCard
          icon={Users}
          label="Khách đang xử lý"
          value={stats.activeContacts}
          accent="blue"
        />
        <ChartKpiCard
          icon={CalendarClock}
          label="Lịch hẹn hôm nay"
          value={stats.todayAppointments}
          accent="amber"
        />
        <ChartKpiCard
          icon={ShoppingBag}
          label="Đơn hàng tháng này"
          value={stats.monthlyOrders}
          accent="violet"
        />
        <ChartKpiCard
          icon={Wallet}
          label="Doanh số tháng này"
          value={stats.monthlyRevenue}
          accent="green"
        />
      </div>

      {/* ─── Việc cần làm hôm nay ─── */}
      <div className={cx("section-title")}>Việc cần làm hôm nay</div>
      <div className={cx("todo-row")}>
        <TodoCard
          icon={CalendarClock}
          title="Lịch hẹn hôm nay"
          count={stats.todayAppointmentsList.length}
          emptyText="Không có lịch hẹn nào hôm nay"
          accent="amber"
        >
          {stats.todayAppointmentsList.map((item) => (
            <div key={item._id} className={cx("todo-item")}>
              <span className={cx("todo-time")}>{item.appointmentTime}</span>
              <div>
                <p className={cx("todo-name")}>
                  {item.contactId?.buyerId?.username ?? "Khách hàng"}
                </p>
                <p className={cx("todo-sub")}>
                  {item.appointmentCar?.name} • {item.showroom}
                </p>
              </div>
            </div>
          ))}
        </TodoCard>

        <TodoCard
          icon={Inbox}
          title="Liên hệ mới"
          count={stats.newContactsList.length}
          emptyText="Không có liên hệ mới"
          accent="blue"
        >
          {stats.newContactsList.map((item) => (
            <div key={item._id} className={cx("todo-item")}>
              <div>
                <p className={cx("todo-name")}>{item.name}</p>
                <p className={cx("todo-sub")}>
                  {item.phone} {item.carName ? `• ${item.carName}` : ""}
                </p>
              </div>
            </div>
          ))}
        </TodoCard>

        <TodoCard
          icon={Wrench}
          title="Xe chờ kiểm định"
          count={stats.pendingInspectionList.length}
          emptyText="Không có xe nào cần kiểm định"
          accent="red"
        >
          {stats.pendingInspectionList.map((item) => (
            <div key={item._id} className={cx("todo-item")}>
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className={cx("todo-img")}
                />
              )}
              <div>
                <p className={cx("todo-name")}>{item.name}</p>
                <p className={cx("todo-sub")}>{item.brand}</p>
              </div>
            </div>
          ))}
        </TodoCard>
      </div>

      {/* ─── Breakdown charts ─── */}
      <div className={cx("charts-row")}>
        <StatusBreakdownBar
          title="Tiến trình kiểm định xe"
          subtitle="Xe đang phụ trách theo từng bước"
          data={stats.carsByManagerStatus.map((d) => ({
            _id: d._id ?? "pending",
            count: d.count,
          }))}
          labelMap={MANAGER_STATUS_LABEL}
          colorMap={MANAGER_STATUS_COLOR}
          order={["pending", "received", "maintenance", "ready", "completed"]}
        />

        <StatusBreakdownBar
          title="Phễu xử lý khách hàng"
          subtitle="Khách hàng đang phụ trách theo trạng thái"
          data={stats.contactsByStatus}
          labelMap={CONTACT_STATUS_LABEL}
          colorMap={CONTACT_STATUS_COLOR}
          order={[
            "new",
            "contacted",
            "assigned",
            "appointment_created",
            "completed",
            "cancelled",
          ]}
        />
      </div>

      {/* ─── Đơn hàng gần đây ─── */}
      <div className={cx("chart-card")}>
        <div className={cx("chart-header")}>
          <div>
            <h3>Đơn hàng gần đây</h3>
            <p>5 đơn hàng mới nhất của bạn</p>
          </div>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className={cx("chart-empty")} style={{ height: 100 }}>
            <p>Chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className={cx("order-list")}>
            {stats.recentOrders.map((order) => (
              <div key={order._id} className={cx("order-row")}>
                <div>
                  <p className={cx("order-code")}>{order.orderCode}</p>
                  <p className={cx("order-sub")}>
                    {order.carSnapshot?.name} • {order.buyerSnapshot?.username}
                  </p>
                </div>
                <span className={cx("order-amount")}>
                  {formatNumber(order.totalAmount)} VND
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
