import classNames from "classnames/bind";
import styles from "./OrderNoteSection.module.scss";
import type { OrderPaymentMode } from "../../../constant/orderData";

const cx = classNames.bind(styles);

interface Props {
  register: any;
  paymentMode?: OrderPaymentMode;
}

const OrderNoteSection = ({ register, paymentMode }: Props) => {
  const disabled = paymentMode === "detail";

  return (
    <section className={cx("note")}>
      <h3>Ghi chú</h3>

      <textarea
        rows={5}
        placeholder="Nhập ghi chú..."
        disabled={disabled}
        {...register("note")}
        className={cx({
          disabled,
        })}
      />
    </section>
  );
};

export default OrderNoteSection;
