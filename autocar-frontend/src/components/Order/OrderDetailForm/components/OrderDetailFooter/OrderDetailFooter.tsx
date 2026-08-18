import classNames from "classnames/bind";
import styles from "./OrderDetailFooter.module.scss";

import {
  ORDER_STATUS_LABEL,
  ORDER_STATUS_TRANSITIONS,
} from "../../../constant/orderData";

import type { OrderModeType } from "../../../../Appointment/AppointmentManager/constant/useAppointmentData";
import type { OrderType } from "../../../../../types/order/order.type";

const cx = classNames.bind(styles);

interface Props {
  order?: OrderType;
  status?: "pending" | "processing" | "completed" | "cancelled";

  isUpdating?: boolean;
  isExporting?: boolean;
  isCreatingPayment?: boolean;

  onBack: (mode: OrderModeType) => void;

  onProcessing?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;

  onExportPdf?: () => void;
}

const OrderDetailFooter = ({
  status,
  isUpdating = false,
  order,
  isExporting = false,
  isCreatingPayment = false,
  onBack,
  onProcessing,
  onComplete,
  onCancel,
  onExportPdf,
}: Props) => {
  const nextStatus = status && ORDER_STATUS_TRANSITIONS[status]?.[0];
  return (
    <div className={cx("footer")}>
      <div className={cx("left")}>
        <button
          type="button"
          className={cx("btn-back")}
          onClick={() => onBack("")}
        >
          <i className="fa-solid fa-arrow-left" />
          Quay lại
        </button>
      </div>

      <div className={cx("right")}>
        {(status !== "completed" && status !== "cancelled") ||
          (order?.remainingAmount === 0 && (
            <button
              type="submit"
              form="createPaymentForm"
              className={cx("payment")}
              disabled={isCreatingPayment}
            >
              <i className="fa-solid fa-money-bill-wave" />

              {isCreatingPayment ? "Đang tạo thanh toán..." : "Tạo thanh toán"}
            </button>
          ))}
        {nextStatus && (
          <button
            type="button"
            className={cx(nextStatus)}
            disabled={isUpdating}
            onClick={() => {
              if (nextStatus === "processing") {
                onProcessing?.();
              }

              if (nextStatus === "completed") {
                onComplete?.();
              }

              if (nextStatus === "cancelled") {
                onCancel?.();
              }
            }}
          >
            {nextStatus === "processing" && (
              <i className="fa-solid fa-spinner" />
            )}

            {nextStatus === "completed" && (
              <i className="fa-solid fa-circle-check" />
            )}

            {nextStatus === "cancelled" && <i className="fa-solid fa-ban" />}

            {ORDER_STATUS_LABEL[nextStatus]}
          </button>
        )}

        <button
          type="button"
          className={cx("pdf")}
          onClick={onExportPdf}
          disabled={isExporting}
        >
          <i className="fa-regular fa-file-pdf" />

          {isExporting ? "Đang xuất..." : "Xuất PDF"}
        </button>
      </div>
    </div>
  );
};

export default OrderDetailFooter;
