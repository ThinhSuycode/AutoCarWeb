import classNames from "classnames/bind";
import styles from "./OrderFooter.module.scss";
import type { OrderPaymentMode } from "../../../constant/orderData";
import type { OrderModeType } from "../../../../Appointment/AppointmentManager/constant/useAppointmentData";
import type { UseFormReset } from "react-hook-form";
import type { CreateOrderInput } from "../../../../../schemas/order.schema";
import { useCallback } from "react";

const cx = classNames.bind(styles);

interface Props {
  status?: "pending" | "processing" | "completed" | "cancelled";

  paymentMode: OrderPaymentMode;
  onChangeOrderMode: (mode: OrderModeType) => void;
  isUpdating?: boolean;
  isExporting?: boolean;
  onReset?: UseFormReset<CreateOrderInput>;
  onSave?: () => void;
  onCancelEdit?: () => void;

  onProcessing?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  onExportPdf?: () => void;
  onChangePaymentMode: (mode: OrderPaymentMode) => void;
}
const OrderFooter = ({
  status,
  paymentMode,
  isUpdating = false,
  isExporting = false,
  onSave,
  onCancelEdit,
  onProcessing,
  onReset,
  onComplete,
  onCancel,
  onExportPdf,
  onChangeOrderMode,
  onChangePaymentMode,
}: Props) => {
  const isEdit = paymentMode === "edit";
  const onCancelReset = useCallback(
    (mode: OrderPaymentMode) => {
      onReset?.();
      onChangePaymentMode(mode);
    },
    [onChangePaymentMode, onReset],
  );
  return (
    <div className={cx("footer")}>
      <div className={cx("left")}>
        {!isEdit && (
          <button
            className={cx("btn-back")}
            onClick={() => onChangeOrderMode("")}
          >
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại
          </button>
        )}
        {!isEdit && status !== "completed" && status !== "cancelled" && (
          <button
            className={cx("edit")}
            onClick={() => onChangePaymentMode("edit")}
          >
            <i className="fa-regular fa-pen-to-square" />
            Chỉnh sửa
          </button>
        )}

        {isEdit && (
          <button
            type="submit"
            form="orderForm-detail"
            className={cx("save")}
            onClick={onSave}
            disabled={isUpdating}
          >
            <i className="fa-regular fa-floppy-disk" />
            {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        )}
      </div>

      <div className={cx("right")}>
        {isEdit ? (
          <button
            className={cx("cancelEdit")}
            onClick={() => onCancelReset("detail")}
          >
            <i className="fa-solid fa-arrow-rotate-left" />
            Hủy chỉnh sửa
          </button>
        ) : (
          <>
            {/* {status === "pending" && (
              <button
                className={cx("processing")}
                onClick={onProcessing}
                disabled={isUpdating}
              >
                <i className="fa-solid fa-spinner" />
                {isUpdating ? "Đang xử lý..." : "Đang xử lý"}
              </button>
            )} */}

            {status === "processing" && (
              <button
                className={cx("complete")}
                onClick={onComplete}
                disabled={isUpdating}
              >
                <i className="fa-solid fa-circle-check" />
                {isUpdating ? "Đang hoàn thành..." : "Hoàn thành"}
              </button>
            )}

            {status !== "completed" && status !== "cancelled" && (
              <button
                className={cx("cancel")}
                onClick={onCancel}
                disabled={isUpdating}
              >
                <i className="fa-solid fa-ban" />
                Hủy đơn
              </button>
            )}

            <button
              className={cx("pdf")}
              onClick={onExportPdf}
              disabled={isExporting}
            >
              <i className="fa-regular fa-file-pdf" />
              {isExporting ? "Đang xuất..." : "Xuất PDF"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderFooter;
