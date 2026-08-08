import classNames from "classnames/bind";
import styles from "./AppointmentHistory.module.scss";
import LoadingData from "../../components/LoadingData/LoadingData";
import { SERVICE_ICON, SERVICE_LABEL } from "../../constants/serviceData";
import PageHeader from "../../components/PageHeader/PageHeader";
import useAppointmentHistory from "./hooks/useAppointmentHistory";
import EmptyData from "../../components/EmtyData/EmptyData";
import { STATUS_LABEL } from "./constant/appointmentHistory";
import UserAppointment from "../../components/Appointment/UserAppointment/UserAppointment";
import ModalLayout from "../../components/ModalLayout/ModalLayout";
import type { Appointment } from "../../types/appointment/appointment.type";

const cx = classNames.bind(styles);

const AppointmentHistory = () => {
  const {
    appointments,
    isLoading,
    handleCancel,
    isLoadingCancel,
    appointmentDetail,
    setAppointmentDetail,
    onHandleClose,
  } = useAppointmentHistory();
  if (isLoading) {
    return <LoadingData message="Đang tải lịch hẹn..." />;
  }
  console.log(appointments);
  return (
    <div className={cx("appointmentHistory-page")}>
      <PageHeader
        title="Lịch hẹn của tôi"
        description="Xem lịch hẹn đã được xác nhận"
      ></PageHeader>
      <ModalLayout
        showForm={!!appointmentDetail}
        onClose={onHandleClose}
        classNames="appointment"
      >
        {appointmentDetail && (
          <UserAppointment
            appointment={appointmentDetail}
            onClose={onHandleClose}
          ></UserAppointment>
        )}
      </ModalLayout>

      {appointments.length === 0 ? (
        <div className={cx("emptyData")}>
          <EmptyData
            title="Hiện tại bạn chưa có lịch hẹn"
            description="Thực hiện liên hệ chúng tôi để nhận lịch hẹn."
          ></EmptyData>
        </div>
      ) : (
        <div className={cx("list")}>
          {appointments.map((appointment: Appointment) => {
            const contact = appointment.contactId;
            const car = contact.carId ?? appointment.appointmentCar;
            return (
              <div key={appointment._id} className={cx("card")}>
                <div className={cx("card-top")}>
                  <div className={cx("service")}>
                    <i
                      className={`fa-solid ${
                        SERVICE_ICON[appointment.appointmentType]
                      }`}
                    />

                    <span>{SERVICE_LABEL[appointment.appointmentType]}</span>
                  </div>

                  <span className={cx("status", appointment.status)}>
                    {STATUS_LABEL[appointment.status]}
                  </span>
                </div>

                <div className={cx("car")}>
                  <img
                    src={car?.thumbnail ?? "https://placehold.co/120x80"}
                    alt={car?.name ?? "Car"}
                  />

                  <div className={cx("car-info")}>
                    <h4>{car?.name ?? "Chưa chọn xe"}</h4>

                    <span>{car?.brand ?? "---"}</span>

                    {contact?.carPrice && (
                      <strong className={cx("price")}>
                        {contact?.carPrice.toLocaleString("vi-VN")} VNĐ
                      </strong>
                    )}
                  </div>
                </div>

                <div className={cx("meta")}>
                  <div>
                    <i className="fa-regular fa-calendar" />

                    <span>
                      {new Date(appointment.appointmentDate).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </div>

                  <div>
                    <i className="fa-regular fa-clock" />

                    <span>{appointment.appointmentTime}</span>
                  </div>

                  <div>
                    <i className="fa-solid fa-location-dot" />

                    <span>{appointment.showroom}</span>
                  </div>
                </div>

                {appointment.note && (
                  <div className={cx("note")}>{appointment.note}</div>
                )}

                <div className={cx("actions")}>
                  <button
                    className={cx("detail")}
                    onClick={() => setAppointmentDetail(appointment)}
                  >
                    Xem chi tiết
                  </button>

                  {appointment.status === "pending" && (
                    <button
                      disabled={isLoadingCancel}
                      className={cx("cancel")}
                      onClick={() => handleCancel(appointment._id)}
                    >
                      Hủy lịch
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
