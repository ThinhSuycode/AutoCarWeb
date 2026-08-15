import classNames from "classnames/bind";
import styles from "./OrderHistory.module.scss";

import type { PaymentType } from "../../../../../types/payment/payment.type";

import HistoryCard from "./components/HistoryCard/HistoryCard";
import HistoryHeader from "./components/HistoryHeader/HistoryHeader";
import useOrderHistory from "./hooks/useOrderHistory";

const cx = classNames.bind(styles);

interface Props {
  orderId?: string;
  payments?: PaymentType[];
}

const OrderHistory = ({ payments = [], orderId }: Props) => {
  const { paymentData, isLoading } = useOrderHistory(orderId);

  const paymentDataShow = orderId ? (paymentData ?? []) : payments;

  if (isLoading) {
    return (
      <section className={cx("orderHistory-wrapper")}>
        <div className={cx("empty")}>
          <span>Đang tải lịch sử thanh toán...</span>
        </div>
      </section>
    );
  }

  return (
    <section className={cx("orderHistory-wrapper")}>
      <HistoryHeader payments={paymentDataShow} />

      {paymentDataShow.length === 0 ? (
        <div className={cx("empty")}>
          <i className="fa-regular fa-clock" />

          <strong>Chưa có giao dịch</strong>

          <span>Đơn hàng chưa phát sinh khoản thanh toán nào.</span>
        </div>
      ) : (
        <div className={cx("history-list")}>
          {paymentDataShow.map((payment) => (
            <HistoryCard key={payment._id} payment={payment} />
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
