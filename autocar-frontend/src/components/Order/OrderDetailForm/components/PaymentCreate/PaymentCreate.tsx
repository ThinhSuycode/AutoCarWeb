import classNames from "classnames/bind";
import styles from "./PaymentCreate.module.scss";

import type {
  Control,
  FieldError,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type {
  CreatePaymentInput,
  CreatePaymentOutput,
} from "../../../../../schemas/payment.schema";

import {
  PAYMENT_METHODS_DATA,
  type PAYMENT_METHODS_TYPE,
  type PaymentMethod,
} from "../../../constant/orderData";

import PaymentMethodCard from "../../../components/PaymentMethodCard/PaymentMethodCard";
import MoneyInput from "../../../../MoneyInput/MoneyInput";

const cx = classNames.bind(styles);

interface Props {
  control: Control<CreatePaymentInput, any, CreatePaymentOutput>;

  register: UseFormRegister<CreatePaymentInput>;

  errors: FieldErrors<CreatePaymentInput>;

  paymentMethod: PaymentMethod | null;

  onChange: (value: PaymentMethod) => void;
}

const PaymentCreate = ({
  control,
  register,
  errors,
  paymentMethod,
  onChange,
}: Props) => {
  return (
    <section className={cx("section-payment")}>
      <h3>Thanh toán</h3>

      <div className={cx("payment-item")}>
        {PAYMENT_METHODS_DATA.map((item: PAYMENT_METHODS_TYPE) => (
          <PaymentMethodCard
            key={item.value}
            title={item.title}
            value={item.value}
            checked={paymentMethod === item.value}
            onChange={onChange}
            icon={item.icon}
          />
        ))}
      </div>

      <div className={cx("form-input")}>
        <MoneyInput
          label="Số tiền thanh toán"
          name="amount"
          control={control}
          placeholder="Nhập số tiền"
          error={errors.amount as FieldError | undefined}
        />

        <div className={cx("form-field")}>
          <label>Ghi chú</label>

          <textarea placeholder="Nhập ghi chú" {...register("note")} />

          {errors.note && (
            <small className={cx("error")}>{errors.note.message}</small>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentCreate;
