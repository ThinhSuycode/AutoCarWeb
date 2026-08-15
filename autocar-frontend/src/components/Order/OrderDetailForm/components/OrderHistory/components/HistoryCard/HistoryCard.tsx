import classNames from "classnames/bind";
import styles from "./HistoryCard.module.scss";
import type { PaymentType } from "../../../../../../../types/payment/payment.type";
import {
  PAYMENT_STATUS_ICON,
  PAYMENT_STATUS_LABEL,
  STATUS_PAYMENT_TRANSITIONS,
} from "../../../../../constant/paymentData";
import { PAYMENT_LABEL } from "../../../../../constant/orderData";
import {
  formatDate,
  formatPrice,
} from "../../../../../OrderForm/utils/useFormat";
import useHistoryCard from "./hooks/useHistoryCard";

const cx = classNames.bind(styles);

interface Props {
  payment: PaymentType;
}

const HistoryCard = ({ payment }: Props) => {
  const statusAllow = STATUS_PAYMENT_TRANSITIONS[payment.status];
  const { handleUpdateStatus, isPending, userData } = useHistoryCard(payment);
  return (
    <div className={cx("history-item")}>
      <div className={cx("history-info")}>
        <div className={cx("icon", payment.status)}>
          <i className={`fa-solid ${PAYMENT_STATUS_ICON[payment.status]}`} />
        </div>

        <div className={cx("content")}>
          <div className={cx("top")}>
            <div className={cx("title")}>
              <strong>{PAYMENT_LABEL[payment.method]}</strong>

              <span className={cx("status", payment.status)}>
                {PAYMENT_STATUS_LABEL[payment.status]}
              </span>
            </div>

            <strong className={cx("amount")}>
              {formatPrice(payment.amount)}
            </strong>
          </div>

          <div className={cx("meta")}>
            {payment.transactionCode && (
              <span>
                <i className="fa-solid fa-hashtag" />
                {payment.transactionCode}
              </span>
            )}

            <span>
              <i className="fa-regular fa-calendar" />
              {formatDate(payment.paidAt ?? payment.createdAt)}
            </span>

            {payment.createdBy && (
              <span>
                <i className="fa-regular fa-user" />
                {payment.createdBy.username}
              </span>
            )}
          </div>

          {payment.note && (
            <p className={cx("note")}>
              <i className="fa-regular fa-note-sticky" />
              {payment.note}
            </p>
          )}
        </div>
      </div>
      {userData?.role !== "user" && (
        <div className={cx("form-status")}>
          <p>Cập nhật trạng thái</p>
          <div className={cx("action-list")}>
            {statusAllow.map((item) => (
              <button
                className={cx(item)}
                onClick={() => handleUpdateStatus(item)}
              >
                {isPending ? "Đang tải..." : PAYMENT_STATUS_LABEL[item]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryCard;
