import PageHeader from "../../../../../components/PageHeader/PageHeader";
import classNames from "classnames/bind";
import styles from "./DashBoardHeader.module.scss";

const cx = classNames.bind(styles);

const DashBoardHeader = () => {
  return (
    <PageHeader
      title="DashBoard"
      description="Quản lý doanh thu của hệ thống AutoViet"
    >
      <div className={cx("dashBoard-date")}>
        <span className={cx("date")}>
          <i className="fa-regular fa-calendar"></i>
          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>
    </PageHeader>
  );
};

export default DashBoardHeader;
