import classNames from "classnames/bind";
import styles from "./OrderSummary.module.scss";
import { formatPrice } from "../../../../hooks/formatPrice";

const cx = classNames.bind(styles);

type Props = {
  unitPrice: number;
  salePrice: number;
  taxRate: number;
  discount: number;
  detail?: boolean;
  paidAmount?: number;
  remainingAmount?: number;
  setOpenOrder?: (status: boolean) => void;
};

const OrderSummary = ({
  unitPrice,
  salePrice,
  taxRate,
  discount,
  detail,
  paidAmount = 0,
  remainingAmount,
  setOpenOrder,
}: Props) => {
  const tax = salePrice * (taxRate / 100);

  const orderTotal = salePrice + tax;

  const remainingResult = remainingAmount
    ? remainingAmount
    : Math.max(0, orderTotal - paidAmount);

  return (
    <section className={cx("summary")}>
      <div className={cx("heading")}>
        <h3>Tổng kết đơn hàng</h3>
        {detail && (
          <div onClick={() => setOpenOrder?.(true)} className={cx("openOrder")}>
            Chi tiết
          </div>
        )}
      </div>

      <div className={cx("item")}>
        <span>Giá niêm yết</span>
        <strong>{formatPrice(unitPrice)}</strong>
      </div>

      <div className={cx("item")}>
        <span>Giá bán</span>
        <strong>{formatPrice(salePrice)}</strong>
      </div>

      <div className={cx("item")}>
        <span>VAT ({taxRate}%)</span>
        <strong>{formatPrice(tax)}</strong>
      </div>

      <div className={cx("item")}>
        <span>Giảm giá</span>
        <strong className={cx("discount")}>- {formatPrice(discount)}</strong>
      </div>

      <hr />

      <div className={cx("item", "order-total")}>
        <span>Tổng giá trị đơn hàng</span>
        <strong>{formatPrice(orderTotal)}</strong>
      </div>

      <div className={cx("item", "paid")}>
        <span>Đã thanh toán</span>
        <strong>- {formatPrice(paidAmount)}</strong>
      </div>

      <div className={cx("remaining")}>
        <span>Còn phải thanh toán</span>
        <strong>{formatPrice(remainingResult)}</strong>
      </div>
    </section>
  );
};

export default OrderSummary;
