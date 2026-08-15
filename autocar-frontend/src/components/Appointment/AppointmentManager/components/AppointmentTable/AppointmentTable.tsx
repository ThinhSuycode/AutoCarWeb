import classNames from "classnames/bind";
import styles from "./AppointmentTable.module.scss";
import {
  SERVICES_LABEL,
  STATUS_LABEL,
} from "../../constant/useAppointmentData";
import { formatDateToString } from "../../../../../hooks/formatDate";
import EmptyData from "../../../../EmtyData/EmptyData";
import LoadingData from "../../../../LoadingData/LoadingData";
import type { Appointment } from "../../../../../types/appointment/appointment.type";

const cx = classNames.bind(styles);

interface Props {
  appointments: Appointment[];
  role: "admin" | "staff";
  onChangeAppointment: (appointment: Appointment | undefined) => void;
  isLoading: boolean;
}

const AppointmentTable = ({
  appointments,
  role,
  onChangeAppointment,
  isLoading,
}: Props) => {
  if (isLoading) {
    return <LoadingData message="Đang tải lịch hẹn..." />;
  }

  if (appointments.length === 0) {
    return (
      <div className={cx("emptyData")}>
        <EmptyData
          title="Không có lịch hẹn"
          description="Hiện chưa có khách hàng đăng ký lịch hẹn."
        />
      </div>
    );
  }

  return (
    <div className={cx("table-wrapper")}>
      <table className={cx("table")}>
        <thead>
          <tr>
            <th>Khách hàng</th>

            {role === "admin" && <th>Sale phụ trách</th>}

            <th>Xe quan tâm</th>
            <th>Dịch vụ</th>
            <th>Showroom</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Trạng thái</th>

            {role === "admin" && (
              <>
                <th>Người tạo</th>
                <th>Ngày tạo</th>
              </>
            )}

            <th></th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((item) => (
            <tr key={item._id}>
              <td>{item.contactId.name ?? item.contactId.buyerId?.username}</td>
              {role === "admin" && (
                <td>{item.contactId.managerId?.username}</td>
              )}

              <td className={cx("car-info")}>
                <img src={item.contactId.carId?.thumbnail} alt="No img" />
                <div>
                  <p> {item.contactId.carName}</p>
                  <p className={cx("car-id")}>#{item.contactId.carId?._id}</p>
                </div>
              </td>

              <td>{SERVICES_LABEL[item.appointmentType]}</td>
              <td>{item.showroom}</td>
              <td>
                {new Date(item.appointmentDate).toLocaleDateString("vi-VN")}
              </td>

              <td>{item.appointmentTime}</td>

              <td>
                <span className={cx("status", item.status)}>
                  {STATUS_LABEL[item.status]}
                </span>
              </td>
              {role === "admin" && <td>{item.createdBy.username}</td>}

              {role === "admin" && (
                <td>{formatDateToString(item.createdAt)}</td>
              )}

              <td>
                <button
                  className={cx("btn-activeDetail")}
                  onClick={() => onChangeAppointment(item)}
                >
                  <i className="fa-solid fa-eye" />
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
