import classNames from "classnames/bind";
import styles from "./FormContactDetail.module.scss";
import { STATUS_LABEL } from "../../page/Staff/MyContact/constants/statusLabelData";
import FormAppointment from "../Appointment/FormAppointment/FormAppointment";
import AppointmentDetail from "../Appointment/AppointmentDetail/AppointmentDetail";
import useFormContact from "./hooks/useFormContact";
import { useAppointmentDetailQuery } from "../../queries/paymentQuery/useAppoinmentDetail";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useConfirm } from "../../hooks/useConfirm";
import useDeleteContact from "../../mutations/ContactMutation/useDeleteContact";
import { useCallback } from "react";
import toast from "react-hot-toast";
import type { Contact } from "../../types/contact/contact.type";
import ModalLayout from "../ModalLayout/ModalLayout";

const cx = classNames.bind(styles);

interface Props {
  contact: Contact | undefined;
  onClose: () => void;
}

const FormContactDetail = ({ contact, onClose }: Props) => {
  if (!contact) return null;
  const { data: appointment } = useAppointmentDetailQuery(contact._id);
  const { viewMode, setViewMode, userData } = useFormContact();
  const { confirm, confirmProps } = useConfirm();
  const { mutateAsync: deleteContact, isPending } = useDeleteContact();

  const handleDeleteContact = useCallback(async (id: string) => {
    try {
      const ok = await confirm({
        title: "Bạn có muốn xoá liên hệ này không??",
        message: "Thao tác chỉ được thực hiện một lần!!",
        confirmText: "Đồng ý",
        cancelText: "Huỷ",
      });
      if (!ok) return;
      await deleteContact({ id });
      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Xoá liên hệ không thành công!",
      );
    }
  }, []);

  const hasAppointment =
    contact.status === "appointment_created" || contact.status === "completed";

  return (
    <ModalLayout onClose={onClose} showForm={viewMode.length > 0}>
      <ConfirmDialog {...confirmProps}></ConfirmDialog>
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("modal-header")}>
          <div className={cx("header-title")}>
            <div className={cx("icon-wrapper")}>
              <i className="fa-regular fa-address-card" />
            </div>

            <div>
              <h3>
                {viewMode === "detail" && "Chi tiết khách hàng"}
                {viewMode === "createAppointment" && "Tạo lịch hẹn"}
                {viewMode === "appointmentDetail" && "Chi tiết lịch hẹn"}
              </h3>

              <p>Mã LH: #{contact._id.slice(-6).toUpperCase()}</p>
            </div>
          </div>

          <button className={cx("close-btn")} onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Body */}
        <div className={cx("modal-body")}>
          {viewMode === "detail" && (
            <div className={cx("detail-grid")}>
              <div className={cx("field")}>
                <label>Họ tên</label>
                <p>{contact.name}</p>
              </div>

              <div className={cx("field")}>
                <label>Số điện thoại</label>
                <p>{contact.phone}</p>
              </div>

              <div className={cx("field")}>
                <label>Xe quan tâm</label>
                <p>{contact.carName || "Không có"}</p>
              </div>

              <div className={cx("field")}>
                <label>Hãng xe</label>
                <p>{contact.carBrand || "Không có"}</p>
              </div>

              <div className={cx("field")}>
                <label>Trạng thái</label>

                <span className={cx("status", contact.status)}>
                  {STATUS_LABEL[contact.status]}
                </span>
              </div>

              <div className={cx("field")}>
                <label>Sale phụ trách</label>

                <p>{contact.managerId?.username ?? "Chưa phân công"}</p>
              </div>

              <div className={cx("field")}>
                <label>Ngày tạo</label>

                <p>{new Date(contact.createdAt).toLocaleString("vi-VN")}</p>
              </div>

              <div className={cx("field")}>
                <label>Ghi chú</label>

                <p>{contact.notes}</p>
              </div>

              <div className={cx("field", "full-width")}>
                <label>Lời nhắn</label>

                <textarea
                  readOnly
                  value={
                    contact.message || "Khách hàng không để lại lời nhắn..."
                  }
                />
              </div>
            </div>
          )}

          {viewMode === "createAppointment" && (
            <FormAppointment
              contact={contact}
              onClose={onClose}
              onChange={() => setViewMode("detail")}
            />
          )}

          {viewMode === "appointmentDetail" && appointment && (
            <AppointmentDetail appointment={appointment} />
          )}
        </div>

        {/* Footer */}
        {viewMode === "detail" && (
          <div className={cx("modal-footer")}>
            <div className={cx("left")}>
              {userData?.role === "admin" && (
                <button
                  className={cx("btn-delete")}
                  onClick={() => handleDeleteContact(contact._id)}
                >
                  {isPending ? "Đang thực hiện..." : "Xóa liên hệ"}
                </button>
              )}
            </div>

            <div className={cx("right")}>
              {hasAppointment ? (
                <button
                  className={cx("btn-action")}
                  onClick={() => setViewMode("appointmentDetail")}
                >
                  <i className="fa-regular fa-calendar-check" />
                  Xem lịch hẹn
                </button>
              ) : (
                <button
                  className={cx("btn-action")}
                  onClick={() => setViewMode("createAppointment")}
                >
                  <i className="fa-regular fa-calendar-plus" />
                  Tạo lịch hẹn
                </button>
              )}

              <button className={cx("btn-close")} onClick={onClose}>
                Đóng
              </button>
            </div>
          </div>
        )}

        {(viewMode === "createAppointment" ||
          viewMode === "appointmentDetail") && (
          <div className={cx("modal-footer")}>
            <button
              className={cx("btn-back")}
              onClick={() => setViewMode("detail")}
            >
              <i className="fa-solid fa-arrow-left" />
              Quay lại
            </button>

            <button className={cx("btn-close")} onClick={onClose}>
              Đóng
            </button>
          </div>
        )}
      </div>
    </ModalLayout>
  );
};

export default FormContactDetail;
