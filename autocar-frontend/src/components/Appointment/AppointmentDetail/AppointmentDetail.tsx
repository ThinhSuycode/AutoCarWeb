import classNames from "classnames/bind";
import styles from "./AppointmentDetail.module.scss";
import { SERVICE_ICON, SERVICE_LABEL } from "../../../constants/serviceData";
import useAppointmentDetail from "./hooks/useAppointmentDetail";
import LoadingData from "../../LoadingData/LoadingData";
import {
  STATUS_LABEL,
  type OrderModeType,
} from "../AppointmentManager/constant/useAppointmentData";
import type { Appointment } from "../../../types/appointment/appointment.type";
import type { OrderType } from "../../../types/order/order.type";

const cx = classNames.bind(styles);

interface Props {
  appointment: Appointment | undefined;
  order?: OrderType | undefined;
  setOrderMode?: (message: OrderModeType) => void;
}

const AppointmentDetail = ({ appointment, setOrderMode, order }: Props) => {
  if (!appointment) {
    return <LoadingData message="Không tìm thấy lịch hẹn..."></LoadingData>;
  }

  const hasOrder = appointment._id === order?.appointmentId?._id;

  const {
    confirmAppointment,
    isLoadingCancel,
    isLoadingConfirm,
    cancelAppointment,
    completeAppointment,
    isLoadingComplete,
    exportExcel,
    isExporting,
  } = useAppointmentDetail(appointment?._id);

  const contact = appointment.contactId;

  const car = appointment.appointmentCar ?? contact.carId;

  return (
    <div className={cx("appointment-detail")}>
      <div className={cx("card")}>
        <div className={cx("card-header")}>
          <i className="fa-regular fa-calendar-days" />
          <h3>Thông tin lịch hẹn</h3>
        </div>

        <div className={cx("grid")}>
          <div className={cx("field")}>
            <label>Loại lịch hẹn</label>

            <div className={cx("service")}>
              <i
                className={`fa-solid ${
                  SERVICE_ICON[appointment.appointmentType]
                }`}
              />

              <span>{SERVICE_LABEL[appointment.appointmentType]}</span>
            </div>
          </div>

          <div className={cx("field")}>
            <label>Trạng thái</label>

            <span className={cx("status", appointment.status)}>
              {STATUS_LABEL[appointment.status]}
            </span>
          </div>

          <div className={cx("field")}>
            <label>Ngày hẹn</label>

            <p>
              {new Date(appointment.appointmentDate).toLocaleDateString(
                "vi-VN",
              )}
            </p>
          </div>

          <div className={cx("field")}>
            <label>Giờ hẹn</label>

            <p>{appointment.appointmentTime}</p>
          </div>

          <div className={cx("field", "full")}>
            <label>Showroom</label>

            <p>{appointment.showroom}</p>
          </div>
        </div>
      </div>

      {/* Customer */}
      <div className={cx("card")}>
        <div className={cx("card-header")}>
          <i className="fa-regular fa-user" />
          <h3>Khách hàng</h3>
        </div>

        <div className={cx("grid")}>
          <div className={cx("field")}>
            <label>Họ tên</label>

            <p>{contact.buyerId?.username ?? ""}</p>
          </div>

          <div className={cx("field")}>
            <label>Số điện thoại</label>

            <p>{contact.phone}</p>
          </div>

          <div className={cx("field")}>
            <label>Email</label>

            <p>{contact.buyerId?.email ?? "---"}</p>
          </div>

          <div className={cx("field")}>
            <label>Sale phụ trách</label>

            <p>{contact.managerId?.username ?? "Chưa phân công"}</p>
          </div>
        </div>
      </div>

      <div className={cx("card")}>
        <div className={cx("card-header")}>
          <i className="fa-solid fa-car-side" />
          <h3>Xe quan tâm</h3>
        </div>

        <div className={cx("car")}>
          {car?.thumbnail && <img src={car.thumbnail} alt={car.name} />}

          <div className={cx("car-info")}>
            <h4>{car?.name ?? contact.carName ?? "---"}</h4>

            <span>{car?.brand ?? contact.carBrand ?? "---"}</span>

            <strong>{car?.price.toLocaleString("vi-VN")} VNĐ</strong>
          </div>
        </div>
      </div>

      <div className={cx("card")}>
        <div className={cx("card-header")}>
          <i className="fa-regular fa-note-sticky" />
          <h3>Ghi chú</h3>
        </div>

        <div className={cx("note")}>
          {appointment.note || "Không có ghi chú."}
        </div>
      </div>

      <div className={cx("actions")}>
        {appointment.status === "pending" && (
          <>
            <button
              className={cx("confirm")}
              onClick={() => confirmAppointment(appointment._id)}
            >
              <i className="fa-solid fa-check" />
              {isLoadingConfirm ? "Đang xử lý" : " Xác nhận"}
            </button>

            <button
              className={cx("cancel")}
              onClick={() => cancelAppointment(appointment._id)}
            >
              <i className="fa-solid fa-xmark" />
              {isLoadingCancel ? "Đang xử lý" : "Hủy lịch"}
            </button>
          </>
        )}

        {appointment.status === "confirmed" && (
          <>
            <button
              className={cx("complete")}
              onClick={() => completeAppointment(appointment._id)}
            >
              <i className="fa-solid fa-flag-checkered" />
              {isLoadingComplete ? "Đang xử lý" : "Hoàn thành"}
            </button>

            <button
              className={cx("cancel")}
              onClick={() => cancelAppointment(appointment._id)}
            >
              <i className="fa-solid fa-ban" />
              {isLoadingCancel ? "Đang xử lý" : "Hủy lịch"}
            </button>
          </>
        )}
        {appointment.status === "completed" && (
          <>
            <button
              type="button"
              className={cx("export")}
              onClick={exportExcel}
            >
              <i className="fa-solid fa-file-arrow-down" />
              {isExporting ? "Đang xuất Excel" : "Xuất Excel"}
            </button>
            {order &&
              (hasOrder ? (
                <button
                  type="button"
                  className={cx("btn-createOrder")}
                  onClick={() => setOrderMode?.("detail")}
                >
                  Xem hoá hoá đơn
                </button>
              ) : (
                <button
                  type="button"
                  className={cx("btn-createOrder")}
                  onClick={() => setOrderMode?.("create")}
                >
                  <i className="fa-solid fa-plus" />
                  Tạo hoá đơn
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetail;
