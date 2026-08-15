import {
  SERVICE_ICON,
  SERVICE_LABEL,
} from "../../../../../constants/serviceData";
import type { Appointment } from "../../../../../types/appointment/appointment.type";
import classNames from "classnames/bind";
import styles from "./AppointmentDetail.module.scss";

const cx = classNames.bind(styles);

const AppointmentDetail = ({ appointment }: { appointment: Appointment }) => {
  if (!appointment) return;
  const contact = appointment.contactId;
  return (
    <div className={cx("appointment-wrapper")}>
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
    </div>
  );
};

export default AppointmentDetail;
