import classNames from "classnames/bind";
import styles from "./DashboardManager.module.scss";
import { useDashboardManager } from "./hooks/useDashboardManager";
import Charts from "./components/Charts/Charts";
import QuickAction from "./components/QuickAction/QuickAction";
import LoadingData from "../../../components/LoadingData/LoadingData";
import DashBoardHeader from "./components/DashboardHeader/DashBoardHeader";
import DashboardOverview from "./components/DashboardOverview/DashboardOverview";
import DashboardStats from "./components/DashboardStats/DashboardStats";

const cx = classNames.bind(styles);

// ─── Status badge ─────────────────────────────────────────────────────────────

const DashboardManager = () => {
  const { stats, isLoading } = useDashboardManager();

  if (isLoading) {
    return (
      <div className={cx("dashboardManager-page")}>
        <LoadingData message="Đang tải dữ liệu"></LoadingData>
      </div>
    );
  }

  return (
    <div className={cx("dashboardManager-page")}>
      <DashBoardHeader></DashBoardHeader>
      <Charts stats={stats ?? null}></Charts>

      <DashboardStats stats={stats}></DashboardStats>
      <DashboardOverview stats={stats}></DashboardOverview>

      <QuickAction></QuickAction>
    </div>
  );
};

export default DashboardManager;
