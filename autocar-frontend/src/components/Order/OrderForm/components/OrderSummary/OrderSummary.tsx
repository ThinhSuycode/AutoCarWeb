import classNames from "classnames/bind";
import styles from "./OrderSummary.module.scss";
import { formatPrice } from "../../../../../hooks/formatPrice";

const cx = classNames.bind(styles);

type Props = {
  unitPrice: number;
  salePrice: number;
  taxRate: number;
  deposit: number;
};

const OrderSummary = ({ unitPrice, salePrice, taxRate, deposit }: Props) => {
  const discount = Math.max(0, unitPrice - salePrice);

  const tax = salePrice * (taxRate / 100);

  const total = salePrice + tax - deposit;

  return (
    <section className={cx("summary")}>
      <h3>Tổng kết đơn hàng</h3>

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
        <span>Tiền cọc</span>
        <strong className={cx("deposit")}>- {formatPrice(deposit)}</strong>
      </div>

      <div className={cx("item")}>
        <span>Giảm giá</span>
        <strong className={cx("discount")}>- {formatPrice(discount)}</strong>
      </div>

      <hr />

      <div className={cx("total")}>
        <span>Tổng cần thanh toán</span>
        <strong>{formatPrice(total)}</strong>
      </div>
    </section>
  );
};

export default OrderSummary;
