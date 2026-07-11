import classNames from "classnames/bind";
import styles from "../MyContact.module.scss";
import { serviceAppointment } from "../../../../data/ShowRoom";
import { useForm } from "react-hook-form";
import {
  appointmentSchema,
  type AppointmentFormData,
} from "../../../../schemas/appointment";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Contact } from "../../../../types/contact";

const cx = classNames.bind(styles);

const APPOINTMENT_FORM_DEFAULT: AppointmentFormData = {
  type: "test_drive",
  appointmentDate: "",
  appointmentTime: "",
  showroom: "AutoViet Bình Định",
  note: "",
};

const FormAppointment = ({ contact }: { contact: Contact }) => {
  const { handleSubmit, register } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: APPOINTMENT_FORM_DEFAULT,
  });

  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
      <div className={cx("customer-info")}>
        <h3>Thông tin khách hàng</h3>

        <div className={cx("row")}>
          <label>Khách hàng</label>
          <input value={contact.name} disabled />
        </div>

        <div className={cx("row")}>
          <label>Số điện thoại</label>
          <input value={contact.phone} disabled />
        </div>

        <div className={cx("row")}>
          <label>Xe quan tâm</label>
          <input value={contact.carName} disabled />
        </div>
      </div>

      <div className={cx("row")}>
        <label>Loại lịch hẹn</label>

        <select {...register("type")}>
          {serviceAppointment.map((item) => (
            <option value={item.id}>{item.label}</option>
          ))}
        </select>
      </div>

      <div className={cx("row")}>
        <label>Ngày hẹn</label>
        <input type="date" {...register("appointmentDate")} />
      </div>

      <div className={cx("row")}>
        <label>Giờ hẹn</label>
        <input type="time" {...register("appointmentTime")} />
      </div>

      <div className={cx("row")}>
        <label>Showroom</label>

        <select {...register("showroom")}>
          <option value="AutoViet Bình Định">AutoViet Bình Định</option>

          <option value="AutoViet Đà Nẵng">AutoViet Đà Nẵng</option>

          <option value="AutoViet Hà Nội">AutoViet Hà Nội</option>
        </select>
      </div>

      <div className={cx("row")}>
        <label>Ghi chú</label>

        <textarea rows={4} {...register("note")} />
      </div>

      <div className={cx("actions")}>
        <button type="button">Hủy</button>

        <button type="submit">Tạo lịch hẹn</button>
      </div>
    </form>
  );
};

export default FormAppointment;
