import classNames from "classnames/bind";
import styles from "./ShowroomBooking.module.scss";
import AppointmentForm from "../../../../components/AppointmentForm/AppointmentForm";

const cx = classNames.bind(styles);

const ShowroomBooking = () => {
  return (
    <div className={cx("register-visit")}>
      <div className={cx("heading")}>
        <h3>Đặt Lịch Xem Xe</h3>
        <p>
          Đặt lịch trước để được phục vụ tốt nhất và lái thử xe bạn quan tâm
        </p>
      </div>

      <AppointmentForm />
    </div>
  );
};

export default ShowroomBooking;
