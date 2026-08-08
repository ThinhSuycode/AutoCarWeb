import classNames from "classnames/bind";
import styles from "./UserAppointment.module.scss";

import LoadingData from "../../LoadingData/LoadingData";
import { SERVICE_ICON, SERVICE_LABEL } from "../../../constants/serviceData";
import { STATUS_LABEL } from "../../../page/AppointmentHistory/constant/appointmentHistory";
import type { Appointment } from "../../../types/appointment/appointment.type";

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

  const contact = appointment.contactId;
  return (
    <div className={cx("userAppointment")}>
      <header className={cx("header")}>
        <div>
          <h2>Chi tiết lịch hẹn</h2>

          <p>Mọi thông tin về lịch hẹn của bạn.</p>
        </div>

        <span className={cx("status", appointment.status)}>
          {STATUS_LABEL[appointment.status]}
        </span>
      </header>

      <div className={cx("card")}>
        <h3>Thông tin lịch hẹn</h3>

        <div className={cx("grid")}>
          <div>
            <label>Dịch vụ</label>

            <p>
              <i
                className={`fa-solid ${
                  SERVICE_ICON[appointment.appointmentType]
                }`}
              />

              {SERVICE_LABEL[appointment.appointmentType]}
            </p>
          </div>

          <div>
            <label>Ngày hẹn</label>

            <p>
              {new Date(appointment.appointmentDate).toLocaleDateString(
                "vi-VN",
              )}
            </p>
          </div>

          <div>
            <label>Giờ hẹn</label>

            <p>{appointment.appointmentTime}</p>
          </div>

          <div>
            <label>Showroom</label>

            <p>{appointment.showroom}</p>
          </div>
        </div>
      </div>

      <div className={cx("card")}>
        <h3>Xe quan tâm</h3>

        <div className={cx("car")}>
          <img
            src={
              contact.carId?.thumbnail ?? appointment.appointmentCar?.thumbnail
            }
            alt=""
          />

          <div>
            <h4>
              {contact.carId?.name ??
                appointment.appointmentCar?.name ??
                contact.carName}
            </h4>

            <span>
              {contact.carId?.brand ??
                appointment.appointmentCar?.brand ??
                contact.carBrand}
            </span>

            <strong>
              {(
                contact.carPrice ??
                appointment.appointmentCar?.price ??
                contact.carId?.price
              )?.toLocaleString("vi-VN")}{" "}
              VNĐ
            </strong>
          </div>
        </div>
      </div>

      <div className={cx("card")}>
        <h3>Thông tin liên hệ</h3>

        <div className={cx("grid")}>
          <div>
            <label>Họ tên</label>

            <p>{contact.name}</p>
          </div>

          <div>
            <label>Email</label>

            <p>{contact.buyerId?.email}</p>
          </div>

          <div>
            <label>Số điện thoại</label>

            <p>{contact.phone}</p>
          </div>

          <div>
            <label>Sale phụ trách</label>
            <p>{appointment.createdBy.username ?? "Đang chờ phân công"}</p>
          </div>
        </div>
      </div>

      <div className={cx("card")}>
        <h3>Ghi chú</h3>

        <p>{appointment.note || "Không có ghi chú."}</p>
      </div>
      <div className={cx("action")}>
        <button type="button" className={cx("close")} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
          Huỷ
        </button>
      </div>
    </div>
  );
};

export default UserAppointment;
