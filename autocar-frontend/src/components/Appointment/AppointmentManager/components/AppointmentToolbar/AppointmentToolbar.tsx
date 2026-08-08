import classNames from "classnames/bind";
import styles from "./AppointmentToolbar.module.scss";

import AppointmentFilter from "./AppointmentFilter";

const cx = classNames.bind(styles);

interface Props {
  search: string;
  status: string;
  onSearch: (value: string) => void;
  onStatus: (value: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  isExport?: boolean;
}

const AppointmentToolbar = ({
  search,
  status,
  onSearch,
  onStatus,
  onRefresh,
  onExport,
  isExport,
}: Props) => {
  return (
    <div className={cx("appointmentToolbar-wrapper")}>
      <AppointmentFilter
        search={search}
        status={status}
        onSearch={onSearch}
        onStatus={onStatus}
      />

      <div className={cx("toolbar-actions")}>
        <button type="button" className={cx("refresh")} onClick={onRefresh}>
          <i className="fa-solid fa-rotate-right" />
          Làm mới
        </button>

        <button type="button" className={cx("export")} onClick={onExport}>
          <i className="fa-solid fa-file-arrow-down" />
          {isExport ? "Đang xuất Excel" : "Xuất toàn bộ"}
        </button>
      </div>
    </div>
  );
};

export default AppointmentToolbar;
