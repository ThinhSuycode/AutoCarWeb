import classNames from "classnames/bind";
import styles from "./AppointmentHistory.module.scss";
import { useCallback, useEffect, useState } from "react";
import { callApi, changeApi } from "../../services/api";
import type {
  Appointment,
  AppointmentStatus,
  AppointmentType,
} from "../../types/appointment";
import toast from "react-hot-toast";
import type { PaginatedResponse } from "../../types/pagination";
import ModalLayout from "../../components/ModalLayout/ModalLayout";
import AppointmentModal from "./components/AppointmentModal";
import LoadingData from "../../components/LoadingData/LoadingData";

const cx = classNames.bind(styles);

const SERVICE_ICON: Record<AppointmentType, string> = {
  test_drive: "fa-car-side",
  consultation: "fa-comments",
  maintenance: "fa-wrench",
  inspection: "fa-clipboard-check",
};
const SERVICE_LABEL: Record<AppointmentType, string> = {
  test_drive: "Lái thử xe",
  consultation: "Tư vấn",
  maintenance: "Bảo trì",
  inspection: "Kiểm tra",
};
const STATUS_LABEL: Record<AppointmentStatus, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          await callApi.getData<PaginatedResponse<Appointment>>("appointments");
        if (res) setAppointments(res.data);
      } catch (error) {
        console.error("Fetch appointments error:", error);
        toast.error("Không thể tải lịch hẹn!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const onHandleCancel = useCallback(async (id: string) => {
    try {
      await changeApi.request<Appointment>(
        `appointments/${id}/cancel`,
        "patch",
        {},
      );

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: "cancelled" as AppointmentStatus } : a,
        ),
      );
      toast.success("Đã hủy lịch hẹn!");
    } catch (error: any) {
      console.error("Cancel appointment error:", error);
      toast.error(error?.response?.data?.message || "Không thể hủy lịch hẹn!");
    }
  }, []);

  if (isLoading) return <LoadingData message="Đang tải dữ liệu"></LoadingData>;

  return (
    <div className={cx("appointmentHistory-page")}>
      <ModalLayout showForm={showForm} onClose={() => setShowForm(false)}>
        <AppointmentModal onClose={() => setShowForm(false)}></AppointmentModal>
      </ModalLayout>
      <div className={cx("appointmentHistory-heading")}>
        <h2>Lịch hẹn của tôi</h2>
        <div className={cx("add-calendar")} onClick={() => setShowForm(true)}>
          <span className={cx("icon")}>+</span>
        </div>
      </div>

      <div className={cx("list-card")}>
        {appointments.length === 0 ? (
          <div className={cx("empty")}>Chưa có lịch hẹn nào</div>
        ) : (
          appointments.map((item) => (
            <div key={item._id} className={cx("card")}>
              <div className={cx("left")}>
                <div className={cx("icon", item.type)}>
                  <i className={`fa-solid ${SERVICE_ICON[item.type]}`} />
                </div>
              </div>

              <div className={cx("info")}>
                <div className={cx("heading")}>
                  <h4>{SERVICE_LABEL[item.type]}</h4>
                  <div className={cx("status", item.status)}>
                    {STATUS_LABEL[item.status]}
                  </div>
                </div>

                <p className={cx("desc")}>{item.carName}</p>

                <div className={cx("meta")}>
                  <div>
                    <span>
                      <i className="fa-regular fa-calendar" />
                    </span>
                    <span> {item.date}</span>
                  </div>
                  <div>
                    <span>
                      <i className="fa-regular fa-clock" />
                    </span>
                    <span> {item.time}</span>
                  </div>
                  <div>
                    <span>
                      <i className="fa-solid fa-location-dot" />
                    </span>
                    <span> {item.location}</span>
                  </div>
                </div>

                {item.note && <div className={cx("note")}>{item.note}</div>}

                {item.status !== "cancelled" && item.status !== "completed" && (
                  <div
                    className={cx("cancel")}
                    onClick={() => onHandleCancel(item._id)}
                  >
                    <i className="fa-regular fa-circle-xmark" />
                    <span>Hủy lịch hẹn</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
