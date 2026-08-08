import classNames from "classnames/bind";
import styles from "./AppointmentStaff.module.scss";
import AppointmentManager from "../../../components/Appointment/AppointmentManager/AppointmentManager";

const cx = classNames.bind(styles);

const AppointmentStaff = () => {
  return (
    <div className={cx("appointmentStaff-page")}>
      <AppointmentManager role="staff"></AppointmentManager>
    </div>
  );
};

export default AppointmentStaff;
