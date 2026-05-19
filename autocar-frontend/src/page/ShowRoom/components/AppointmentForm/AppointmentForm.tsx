import classNames from "classnames/bind";
import styles from "./AppointmentForm.module.scss";
import type {
  serviceAppointmentType,
  ShowroomType,
} from "../../../../types/showroom";
import { serviceAppointment, showrooms } from "../../../../data/ShowRoom";
import { Button } from "../../../../components/Button/Button";
import { useAppointmentForm } from "./useAppointmentForm";
import {
  generateDateOptions,
  generateTimeOptions,
} from "../../../../hooks/useDateAndTime";

const cx = classNames.bind(styles);

const dateOptions = generateDateOptions();
const timeOptions = generateTimeOptions();

const RequiredIcon = () => (
  <span className={cx("attention-icon")}>
    <i className="fa-solid fa-star-of-life" />
  </span>
);

const AppointmentForm = () => {
  const { form, isSubmitting, onHandleChange, onHandleSubmit } =
    useAppointmentForm();

  return (
    <div className={cx("appointment-form")}>
      <div className={cx("info-user")}>
        <div className={cx("form-input")}>
          <p>
            Họ và tên <RequiredIcon />
          </p>
          <input
            type="text"
            name="name"
            placeholder="Trần Quý A"
            value={form.name}
            onChange={onHandleChange}
          />
        </div>
        <div className={cx("form-input")}>
          <p>
            Số điện thoại <RequiredIcon />
          </p>
          <input
            type="text"
            name="phone"
            placeholder="0869114177"
            value={form.phone}
            onChange={onHandleChange}
          />
        </div>
      </div>

      {/* Showroom */}
      <div className={cx("option-showRoom")}>
        <p>
          Chọn showroom <RequiredIcon />
        </p>
        <select name="location" value={form.location} onChange={onHandleChange}>
          <option value="">Chọn showroom</option>
          {showrooms.map((item: ShowroomType) => (
            <option key={item.name} value={item.name}>
              {item.name} - {item.city}
            </option>
          ))}
        </select>
      </div>

      {/* Dịch vụ */}
      <div className={cx("option-services")}>
        <p>
          Chọn dịch vụ <RequiredIcon />
        </p>
        <select name="type" value={form.type} onChange={onHandleChange}>
          <option value="">Chọn dịch vụ</option>
          {serviceAppointment.map((item: serviceAppointmentType) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Ngày + Giờ */}
      <div className={cx("date-register")}>
        <div className={cx("option-showRoom")}>
          <p>
            Ngày hẹn <RequiredIcon />
          </p>
          <select name="date" value={form.date} onChange={onHandleChange}>
            <option value="">Chọn ngày</option>
            {dateOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className={cx("option-showRoom")}>
          <p>
            Giờ hẹn <RequiredIcon />
          </p>
          <select name="time" value={form.time} onChange={onHandleChange}>
            <option value="">Chọn giờ</option>
            {timeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ghi chú */}
      <div className={cx("note-register")}>
        <p>Ghi chú</p>
        <textarea
          name="note"
          className={cx("note")}
          placeholder="Xe bạn quan tâm"
          value={form.note}
          onChange={onHandleChange}
        />
      </div>

      <Button large onClick={onHandleSubmit}>
        {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt lịch"}
      </Button>
    </div>
  );
};

export default AppointmentForm;
