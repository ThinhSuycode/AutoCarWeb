import classNames from "classnames/bind";
import styles from "./AppointmentModal.module.scss";
import { useCallback, useEffect, useState } from "react";
import { serviceAppointment, showrooms } from "../../../data/ShowRoom";
import type {
  serviceAppointmentType,
  ShowroomType,
} from "../../../types/showroom";
import {
  generateDateOptions,
  generateTimeOptions,
} from "../../../hooks/useDateAndTime";
import type { CarType } from "../../../types/car";
import { callApi, changeApi } from "../../../services/api";
import type { PaginatedResponse } from "../../../types/pagination";
import toast from "react-hot-toast";
import type { Appointment } from "../../../types/appointment";
import { config } from "../../../config";

const cx = classNames.bind(styles);

const SERVICE_ICON: Record<string, string> = {
  test_drive: "fa-car-side",
  maintenance: "fa-wrench",
  consultation: "fa-comments",
  inspection: "fa-clipboard-check",
};

interface INIT_FORM_TYPE {
  type: string;
  date: string;
  time: string;
  location: string;
  carId: string;
  carName: string;
  note: string;
}

const INIT_FORM: INIT_FORM_TYPE = {
  type: "test_drive",
  date: "",
  time: "",
  location: "",
  carId: "",
  carName: "",
  note: "",
};

const dateOptions = generateDateOptions();
const timeOptions = generateTimeOptions();

const AppointmentModal = ({ onClose }: { onClose: () => void }) => {
  const [activeType, setActiveType] = useState("test_drive");
  const [optionCar, setOptionCar] = useState<CarType[]>([]);
  const [form, setForm] = useState<INIT_FORM_TYPE>(INIT_FORM);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  useEffect(() => {
    const fetchAllCar = async () => {
      try {
        const res =
          await callApi.getData<PaginatedResponse<CarType>>("cars?all=true");
        if (res?.data) setOptionCar(res.data);
      } catch (error) {
        console.error("Fetch cars error:", error);
      }
    };
    fetchAllCar();
  }, []);

  const handleChangeForm = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleCarChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const carId = e.target.value;
      const selectedCar = optionCar.find((car) => car.id === carId);
      setForm((prev) => ({
        ...prev,
        carId: carId || "",
        carName: selectedCar?.name || "",
      }));
    },
    [optionCar],
  );

  useEffect(() => {
    setForm((prev) => ({ ...prev, type: activeType }));
  }, [activeType]);

  const validate = useCallback((formData: INIT_FORM_TYPE): boolean => {
    if (!formData.location) {
      toast.error("Vui lòng chọn showroom!");
      return false;
    }
    if (!formData.type) {
      toast.error("Vui lòng chọn dịch vụ!");
      return false;
    }
    if (!formData.date) {
      toast.error("Vui lòng chọn ngày hẹn!");
      return false;
    }
    if (!formData.time) {
      toast.error("Vui lòng chọn giờ hẹn!");
      return false;
    }
    return true;
  }, []);

  const onHandleSubmitForm = useCallback(async () => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để đặt lịch!");
      return;
    }
    if (!validate(form)) return;
    setLoading(true);
    try {
      const payload = {
        type: form.type,
        userId,
        carId: form.carId || null,
        carName: form.carName || "",
        note: form.note,
        time: form.time,
        date: form.date,
        location: form.location,
      };

      await changeApi.request<Appointment>("appointments", "add", payload);
      toast.success("Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận sớm.");
      setForm(INIT_FORM);
      onClose?.();
      window.location.href = config.Routes.AppoinmentHistory;
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Không thể đặt lịch, vui lòng thử lại!",
      );
    } finally {
      setLoading(false);
    }
  }, [form, userId, validate, onClose]);

  return (
    <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
      <div className={cx("modal-header")}>
        <span>Đặt lịch hẹn mới</span>
        <span className={cx("close-btn")} onClick={onClose}>
          <i className="fa-solid fa-x" />
        </span>
      </div>

      <div className={cx("modal-body")}>
        <div className={cx("field")}>
          <label>
            Loại dịch vụ <span className={cx("required")}>*</span>
          </label>
          <div className={cx("service-grid")}>
            {serviceAppointment.map((item: serviceAppointmentType) => (
              <div
                key={item.id}
                className={cx("service-card", {
                  active: activeType === item.id,
                })}
                onClick={() => setActiveType(item.id)}
              >
                <i className={`fa-solid ${SERVICE_ICON[item.id]}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={cx("row-2")}>
          <div className={cx("field")}>
            <label>
              Ngày hẹn <span className={cx("required")}>*</span>
            </label>
            <select name="date" onChange={handleChangeForm} value={form.date}>
              <option value="">Chọn ngày hẹn</option>
              {dateOptions.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
            </select>
          </div>
          <div className={cx("field")}>
            <label>
              Giờ hẹn <span className={cx("required")}>*</span>
            </label>
            <select name="time" onChange={handleChangeForm} value={form.time}>
              <option value="">Chọn giờ</option>
              {timeOptions.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={cx("field")}>
          <label>
            Showroom <span className={cx("required")}>*</span>
          </label>
          <select
            name="location"
            onChange={handleChangeForm}
            value={form.location}
          >
            <option value="">Chọn showroom</option>
            {showrooms.map((data: ShowroomType) => (
              <option key={data.id} value={data.name}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div className={cx("field")}>
          <label>
            Xe quan tâm <span className={cx("optional")}>(Tùy chọn)</span>
          </label>
          <select name="carId" onChange={handleCarChange} value={form.carId}>
            <option value="">Chọn xe</option>
            {optionCar.map((car: CarType) => (
              <option value={car.id} key={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>

        <div className={cx("field")}>
          <label>
            Ghi chú thêm <span className={cx("optional")}>(Tùy chọn)</span>
          </label>
          <textarea
            className={cx("note")}
            name="note"
            onChange={handleChangeForm}
            value={form.note}
            placeholder="Nhập ghi chú..."
          />
        </div>
      </div>

      <div className={cx("modal-footer")}>
        <button className={cx("btn-cancel")} onClick={onClose}>
          Hủy
        </button>
        <button
          className={cx("btn-confirm")}
          onClick={onHandleSubmitForm}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Xác nhận đặt lịch"}
        </button>
      </div>
    </div>
  );
};

export default AppointmentModal;
