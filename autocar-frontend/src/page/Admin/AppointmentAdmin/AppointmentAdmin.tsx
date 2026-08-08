import classNames from "classnames/bind";
import styles from "./AppointmentAdmin.module.scss";
import AppointmentManager from "../../../components/Appointment/AppointmentManager/AppointmentManager";

const cx = classNames.bind(styles);

const AppointmentAdmin = () => {
  return (
    <div className={cx("appointmentAdmin-page")}>
      <AppointmentManager role="admin"></AppointmentManager>
    </div>
  );
};

export default AppointmentAdmin;
