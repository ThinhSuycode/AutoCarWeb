import classNames from "classnames/bind";
import styles from "./PaymentMethodCard.module.scss";
import type { PaymentMethod } from "../../../constant/orderData";

const cx = classNames.bind(styles);

interface Props {
  title: string;

  value: PaymentMethod;

  checked: boolean;

  icon: string;

  disabled?: boolean;

  onChange?: (value: PaymentMethod) => void;
}

const PaymentMethodCard = ({
  title,
  value,
  icon,
  checked,
  onChange,
}: Props) => {
  return (
    <label className={cx("payment-card", { active: checked })}>
      <input
        hidden
        type="radio"
        checked={checked}
        value={value}
        onChange={() => onChange?.(value)}
      />

      <div className={cx("icon")}>
        <i className={`fa-solid ${icon}`}></i>
      </div>

      <span>{title}</span>
    </label>
  );
};

export default PaymentMethodCard;
