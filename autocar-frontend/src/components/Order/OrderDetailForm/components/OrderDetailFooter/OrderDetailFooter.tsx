import classNames from "classnames/bind";
import styles from "./OrderDetailFooter.module.scss";

import {
  ORDER_STATUS_ICON,
  ORDER_STATUS_LABEL,
} from "../../../constant/orderData";

import type { OrderModeType } from "../../../../Appointment/AppointmentManager/constant/useAppointmentData";
import type { OrderType } from "../../../../../types/order/order.type";
import useOrderFooter from "./hooks/useOrderFooter";

const cx = classNames.bind(styles);

interface Props {
  order: OrderType;
  isUpdating?: boolean;
  isExporting?: boolean;
  isCreatingPayment?: boolean;
  onBack: (mode: OrderModeType) => void;
  onExportPdf?: () => void;
}

const OrderDetailFooter = ({
  isUpdating = false,
  order,
  isExporting = false,
  isCreatingPayment = false,
  onBack,
  onExportPdf,
}: Props) => {
  const { nextStatus, updateLoading, paymentSuccess, handleUpdateStatus } =
    useOrderFooter(order);

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
        {paymentSuccess && (
          <button
            type="submit"
            form="createPaymentForm"
            className={cx("payment")}
            disabled={isCreatingPayment}
          >
            <i className="fa-solid fa-money-bill-wave" />

            {isCreatingPayment ? "Đang tạo thanh toán..." : "Tạo thanh toán"}
          </button>
        )}
        {nextStatus && (
          <button
            type="button"
            className={cx(nextStatus)}
            disabled={isUpdating}
            onClick={() => handleUpdateStatus(nextStatus)}
          >
            <i className={ORDER_STATUS_ICON[nextStatus]}></i>

            {updateLoading
              ? "Đang cập nhật..."
              : ORDER_STATUS_LABEL[nextStatus]}
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
