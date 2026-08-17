import classNames from "classnames/bind";

import styles from "./OrderPaymentSection.module.scss";
import MoneyInput from "../../../MoneyInput/MoneyInput";

import { type OrderPaymentMode } from "../../constant/orderData";

import type { PaymentMethod } from "../../../../types/order/order.constant";
import type { OrderType } from "../../../../types/order/order.type";

import type {
  CreateOrderInput,
  CreateOrderOutput,
} from "../../../../schemas/order.schema";

import type { Control, FieldErrors } from "react-hook-form";

const cx = classNames.bind(styles);

interface Props {
  mode?: OrderPaymentMode;

  order?: OrderType;

  control?: Control<CreateOrderInput, any, CreateOrderOutput>;

  errors?: FieldErrors<CreateOrderInput>;

  paymentMethod?: PaymentMethod;

  onChange?: (value: PaymentMethod) => void;
}

const OrderPaymentSection = ({
  mode = "create",
  order,
  control,
  errors,
}: Props) => {
  const isDetail = mode === "detail";

  return (
    <section className={cx("section-payment")}>
      <h3>Thanh toán</h3>

      <div className={cx("form-input")}>
        {isDetail ? (
          <>
            <div className={cx("field")}>
              <label>Giá bán</label>

              <span>{order?.salePrice.toLocaleString("vi-VN")} VNĐ</span>
            </div>

            <div className={cx("field")}>
              <label>VAT</label>

              <span>{order?.taxRate}%</span>
            </div>

            <div className={cx("field")}>
              <label>Tiền giảm giá</label>

              <span>{order?.discount.toLocaleString("vi-VN")} VNĐ</span>
            </div>
          </>
        ) : (
          <>
            <MoneyInput
              label="Giá bán"
              name="salePrice"
              control={control!}
              placeholder="Giá bán"
              error={errors?.salePrice}
            />

            <MoneyInput
              label="VAT (%)"
              name="taxRate"
              control={control!}
              placeholder="VAT (%)"
              error={errors?.taxRate}
            />

            <MoneyInput
              label="Tiền giảm giá"
              name="discount"
              control={control!}
              placeholder="Tiền giảm giá"
              error={errors?.discount}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default OrderPaymentSection;
