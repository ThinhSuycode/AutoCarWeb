import classNames from "classnames/bind";
import styles from "../AppointmentManager.module.scss";

import type { Appointment } from "../../../../types/appointment";
import { STATUS_LABEL } from "../constant/useAppointmentData";

const cx = classNames.bind(styles);

interface Props {
  appointments: Appointment[];
  isLoading: boolean;
  onView: (appointment: Appointment) => void;
}

const AppointmentTable = ({ appointments, isLoading, onView }: Props) => {
  return (
    <div className={cx("table-wrapper")}>
      <table className={cx("table")}>
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>SĐT</th>
            <th>Showroom</th>
            <th>Ngày hẹn</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className={cx("loading")}>
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : appointments.length === 0 ? (
            <tr>
              <td colSpan={6} className={cx("empty-row")}>
                Không có lịch hẹn nào
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.contactId?.name || "Không xác định"}</td>

                <td>{appointment.contactId?.phone || "—"}</td>

                <td>{appointment.showroom}</td>

                <td>
                  {appointment.appointmentDate
                    ? new Date(appointment.appointmentDate).toLocaleDateString(
                        "vi-VN",
                      )
                    : "—"}
                </td>

                <td>
                  <span className={cx("status", appointment.status)}>
                    {STATUS_LABEL[appointment.status]}
                  </span>
                </td>

                <td>
                  <button
                    type="button"
                    className={cx("view-btn")}
                    onClick={() => onView(appointment)}
                  >
                    <i className="fa-regular fa-eye" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
