import classNames from "classnames/bind";
import styles from "./OrderPaymentForm.module.scss";

import OrderNoteSection from "../../../components/OrderNoteSection/OrderNoteSection";
import OrderPaymentSection from "../../../components/OrderPaymentSection/OrderPaymentSection";

import type { OrderType } from "../../../../../types/order/order.type";

import useOrderPaymentForm from "./hooks/useOrderPaymentForm";
import OrderFooter from "./components/OrderFooter/OrderFooter";

const cx = classNames.bind(styles);

interface Props {
  order: OrderType;
  onBack: () => void;
}

const OrderPaymentForm = ({ order, onBack }: Props) => {
  const {
    register,
    control,
    errors,
    paymentMethod,
    orderPaymentMode,
    setValue,
    setOrderPaymentMode,
    handleSubmit,
    reset,
    onSubmitSave,
  } = useOrderPaymentForm({
    order,
  });

  return (
    <form
      id="order-form"
      className={cx("wrapper")}
      onSubmit={handleSubmit(onSubmitSave)}
    >
      <OrderPaymentSection
        mode={orderPaymentMode}
        order={order}
        control={control}
        errors={errors}
      />

      <OrderNoteSection register={register} paymentMode={orderPaymentMode} />

      <OrderFooter
        orderPaymentMode={orderPaymentMode}
        onBack={onBack}
        onReset={reset}
        onChangeOrderPaymentMode={(mode) => setOrderPaymentMode(mode)}
      />
    </form>
  );
};

export default OrderPaymentForm;
