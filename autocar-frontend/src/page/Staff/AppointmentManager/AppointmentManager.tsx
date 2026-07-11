import classNames from "classnames/bind";
import styles from "./AppointmentManager.module.scss";

import { useState } from "react";
import AppointmentStatistics from "./components/AppointmentStatistics";

const cx = classNames.bind(styles);

const AppointmentManager = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h2>Quản lý lịch hẹn</h2>
      </div>

      <AppointmentStatistics />

      <AppointmentFilter
        search={search}
        status={status}
        setSearch={setSearch}
        setStatus={setStatus}
      />

      <AppointmentTable />
    </div>
  );
};

export default AppointmentManager;
