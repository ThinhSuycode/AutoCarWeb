import classNames from "classnames/bind";
import styles from "./OrderSummary.module.scss";
import { formatPrice } from "../../../../../hooks/formatPrice";
import type { OrderType } from "../../../../../types/order/order.type";

const cx = classNames.bind(styles);

type Props = {
  order: OrderType;
  salePrice: number;
  taxRate: number;
  deposit: number;
};

const OrderSummary = ({ order, salePrice, taxRate, deposit }: Props) => {
  const taxCurrent = salePrice * (taxRate / 100);
  const discountCurrent = order.unitPrice - salePrice;
  const totalAmount = salePrice + taxCurrent - deposit;

  console.log(taxRate, deposit, taxCurrent);
  return (
    <section className={cx("summary")}>
      <h3>Tổng kết đơn hàng</h3>

      <div className={cx("item")}>
        <span>Giá niêm yết</span>
        <strong>{formatPrice(order.unitPrice)}</strong>
      </div>

      <div className={cx("item")}>
        <span>Giá bán</span>
        <strong>{formatPrice(salePrice)}</strong>
      </div>

      <div className={cx("item")}>
        <span>VAT ({taxRate}%)</span>
        <strong>{formatPrice(taxCurrent)}</strong>
      </div>
      <div className={cx("item")}>
        <span>Giảm giá</span>
        <strong className={cx("discount")}>
          - {formatPrice(discountCurrent)}
        </strong>
      </div>

      <div className={cx("item")}>
        <span>Tiền cọc</span>
        <strong className={cx("deposit")}>- {formatPrice(deposit)}</strong>
      </div>

      <hr />

      <div className={cx("total")}>
        <span>Tổng cần thanh toán</span>
        <strong>{formatPrice(totalAmount)}</strong>
      </div>
    </section>
  );
};

export default OrderSummary;
