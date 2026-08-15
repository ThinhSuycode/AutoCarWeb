import classNames from "classnames/bind";
import styles from "./UserAppointment.module.scss";
import LoadingData from "../../LoadingData/LoadingData";
import type { Appointment } from "../../../types/appointment/appointment.type";
import useUserAppointment from "./hooks/useUserAppointment";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import AppointmentDetail from "../AppointmentDetail/AppointmentDetail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import OrderHistory from "../../Order/OrderDetailForm/components/OrderHistory/OrderHistory";
// import AppointmentDetail from "./components/Appointment/AppointmentDetail";

const cx = classNames.bind(styles);

interface Props {
  appointment: Appointment | null;
  isLoading?: boolean;
  onClose: () => void;
}

const UserAppointment = ({ appointment, isLoading, onClose }: Props) => {
  if (isLoading) {
    return <LoadingData message="Đang tải lịch hẹn..." />;
  }

  if (!appointment) {
    return <LoadingData message="Không tìm thấy lịch hẹn..."></LoadingData>;
  }

  const { openOrder, setOpenOrder } = useUserAppointment();

  return (
    <div className={cx("userAppointment")}>
      <Header onClose={onClose}></Header>
      <div className={cx("containt")}>
        <AppointmentDetail appointment={appointment}></AppointmentDetail>
        {openOrder && (
          <>
            <OrderConfirmation id={appointment._id}></OrderConfirmation>
            <OrderHistory orderId={appointment.orderId._id}></OrderHistory>
          </>
        )}
      </div>
      <Footer
        appointment={appointment}
        openOrder={openOrder}
        setOpenOrder={setOpenOrder}
        onClose={onClose}
      ></Footer>
    </div>
  );
};

export default UserAppointment;
