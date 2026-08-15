import classNames from "classnames/bind";
import styles from "./OrderFooter.module.scss";
import {
  ORDER_STATUS_LABEL,
  ORDER_STATUS_TRANSITIONS,
  type OrderPaymentMode,
} from "../../../../../constant/orderData";
import type { UseFormReset } from "react-hook-form";
import type { CreateOrderInput } from "../../../../../../../schemas/order.schema";
import { useCallback } from "react";

const cx = classNames.bind(styles);

interface Props {
  status?: "pending" | "processing" | "completed" | "cancelled";
  orderPaymentMode: OrderPaymentMode;
  isUpdating?: boolean;
  isExporting?: boolean;
  onReset?: UseFormReset<CreateOrderInput>;
  onSave?: () => void;
  onCancelEdit?: () => void;
  onBack: () => void;
  onProcessing?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  onExportPdf?: () => void;
  onChangeOrderPaymentMode: (mode: OrderPaymentMode) => void;
}
const OrderFooter = ({
  status,
  orderPaymentMode,
  isUpdating = false,
  isExporting = false,
  onReset,
  onBack,
  onExportPdf,
  onChangeOrderPaymentMode,
}: Props) => {
  const isEdit = orderPaymentMode === "edit";
  const onCancelReset = useCallback(
    (mode: OrderPaymentMode) => {
      onReset?.();
      onChangeOrderPaymentMode(mode);
    },
    [onChangeOrderPaymentMode, onReset],
  );
  const nextStatus = status && ORDER_STATUS_TRANSITIONS[status]?.[0];
  return (
    <div className={cx("footer")}>
      <div className={cx("left")}>
        {!isEdit && (
          <button type="button" className={cx("btn-back")} onClick={onBack}>
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại
          </button>
        )}
        {!isEdit && status !== "completed" && status !== "cancelled" && (
          <button
            type="button"
            className={cx("edit")}
            onClick={() => onChangeOrderPaymentMode("edit")}
          >
            <i className="fa-regular fa-pen-to-square" />
            Chỉnh sửa
          </button>
        )}

        {isEdit && (
          <button
            type="submit"
            form="order-form"
            className={cx("save")}
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
            type="button"
            className={cx("cancelEdit")}
            onClick={() => onCancelReset("detail")}
          >
            <i className="fa-solid fa-arrow-rotate-left" />
            Hủy chỉnh sửa
          </button>
        ) : (
          <>
            {nextStatus && (
              <button
                type="button"
                className={cx(nextStatus)}
                // onClick={() => onChangeStatus?.(nextStatus)}
                disabled={isUpdating}
              >
                {nextStatus === "processing" && (
                  <i className="fa-solid fa-spinner" />
                )}

                {nextStatus === "completed" && (
                  <i className="fa-solid fa-circle-check" />
                )}

                {ORDER_STATUS_LABEL[nextStatus]}
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
