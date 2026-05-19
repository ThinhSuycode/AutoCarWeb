import classNames from "classnames/bind";
import styles from "../DashboardManager.module.scss";
import { config } from "../../../../config";

const cx = classNames.bind(styles);
const QuickAction = () => {
  return (
    <div className={cx("quick-actions")}>
      <h3>Thao tác nhanh</h3>
      <div className={cx("actions-grid")}>
        <a href={config.Routes.CarsManager} className={cx("action-item")}>
          <i className="fa-solid fa-plus"></i>
          <span>Thêm xe mới</span>
        </a>
        <a href={config.Routes.UsersManager} className={cx("action-item")}>
          <i className="fa-solid fa-user-plus"></i>
          <span>Thêm người dùng</span>
        </a>
        <a href={config.Routes.AssignManager} className={cx("action-item")}>
          <i className="fa-solid fa-users-gear"></i>
          <span>Phân bổ nhân viên</span>
        </a>
        <a href={config.Routes.ArtilcesManager} className={cx("action-item")}>
          <i className="fa-regular fa-newspaper"></i>
          <span>Quản lý bài viết</span>
        </a>
      </div>
    </div>
  );
};

export default QuickAction;
