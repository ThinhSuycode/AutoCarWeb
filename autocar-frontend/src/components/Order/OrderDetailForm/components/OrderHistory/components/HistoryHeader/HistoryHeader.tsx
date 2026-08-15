import classNames from "classnames/bind";
import styles from "./HistoryHeader.module.scss";
import type { PaymentType } from "../../../../../../../types/payment/payment.type";

const cx = classNames.bind(styles);

interface Props {
  payments: PaymentType[];
}

const HistoryHeader = ({ payments }: Props) => {
  return (
    <div className={cx("header")}>
      <div>
        <h3>Lịch sử thanh toán</h3>
        <p>Theo dõi các giao dịch của đơn hàng</p>
      </div>

      <span className={cx("count")}>{payments.length} giao dịch</span>
    </div>
  );
};

export default HistoryHeader;
