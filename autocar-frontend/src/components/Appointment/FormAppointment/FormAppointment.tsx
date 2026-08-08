import classNames from "classnames/bind";
import styles from "./FormAppointment.module.scss";
import { useFormAppointment } from "./hooks/useFormAppointment";
import { SERVICE_ICON } from "../../../constants/serviceData";
import { serviceAppointment } from "../../../page/ShowRoom/constants/showroomData";
import type { Contact } from "../../../types/contact/contact.type";

const cx = classNames.bind(styles);

interface Props {
  contact: Contact;
  onChange: (mode: string) => void;
  onClose: () => void;
}

const FormAppointment = ({ contact, onClose }: Props) => {
  const {
    handleSubmit,
    register,
    errors,
    isPending,
    onSubmit,
    activeType,
    carData,
    setValue,
  } = useFormAppointment({
    onClose,
    contact,
  });
  const hasCar = Boolean(contact.carId || contact.carName);

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
        <input type="hidden" {...register("appointmentType")} />
        <div className={cx("service-grid")}>
          {serviceAppointment.map((item) => (
            <div
              key={item.id}
              className={cx("service-card", {
                active: activeType === item.id,
              })}
              onClick={() => {
                setValue("appointmentType", item.id, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            >
              <i className={`fa-solid ${SERVICE_ICON[item.id]}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {errors.appointmentType && (
          <span className={cx("error")}>{errors.appointmentType.message}</span>
        )}
      </div>

      <div className={cx("row")}>
        <label>Ngày hẹn</label>

        <input type="date" {...register("appointmentDate")} />

        {errors.appointmentDate && (
          <span className={cx("error")}>{errors.appointmentDate.message}</span>
        )}
      </div>

      <div className={cx("row")}>
        <label>Giờ hẹn</label>

        <input type="time" {...register("appointmentTime")} />

        {errors.appointmentTime && (
          <span className={cx("error")}>{errors.appointmentTime.message}</span>
        )}
      </div>

      <div className={cx("row")}>
        <label>Showroom</label>

        <select {...register("showroom")}>
          <option value="AutoViet Bình Định">AutoViet Bình Định</option>
          <option value="AutoViet Đà Nẵng">AutoViet Đà Nẵng</option>
          <option value="AutoViet Hà Nội">AutoViet Hà Nội</option>
        </select>

        {errors.showroom && (
          <span className={cx("error")}>{errors.showroom.message}</span>
        )}
      </div>

      {!hasCar && (
        <div className={cx("row")}>
          <label>Tên xe</label>

          <select {...register("appointmentCar")}>
            <option key={""} value={""}>
              Vui lòng chọn xe
            </option>
            {carData.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>

          {errors.appointmentCar && (
            <span className={cx("error")}>{errors.appointmentCar.message}</span>
          )}
        </div>
      )}

      <div className={cx("row")}>
        <label>Ghi chú</label>

        <textarea rows={4} {...register("note")} />

        {errors.note && (
          <span className={cx("error")}>{errors.note.message}</span>
        )}
      </div>

      <div className={cx("actions")}>
        <button type="button" onClick={onClose} disabled={isPending}>
          Hủy
        </button>

        {contact.status !== "appointment_created" ? (
          <button type="submit" disabled={isPending}>
            {isPending ? "Đang tạo..." : "Tạo lịch hẹn"}
          </button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

export default FormAppointment;
