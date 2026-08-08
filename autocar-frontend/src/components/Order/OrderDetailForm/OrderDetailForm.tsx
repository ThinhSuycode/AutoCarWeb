import classNames from "classnames/bind";
import styles from "./OrderDetailForm.module.scss";
import type { OrderType } from "../../../types/order/order.type";
import OrderHeader from "./components/OrderHeader/OrderHeader";
import OrderCustomerSection from "../OrderForm/components/OrderCustomerSection/OrderCustomerSection";
import OrderCarSection from "../OrderForm/components/OrderCarSection/OrderCarSection";
import OrderFooter from "./components/OrderFooter/OrderFooter";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import useOrderDetail from "./hooks/useOrderDetail";
import OrderPaymentSection from "../OrderForm/components/OrderPaymentSection/OrderPaymentSection";
import type { OrderModeType } from "../../Appointment/AppointmentManager/constant/useAppointmentData";
import OrderNoteSection from "../OrderForm/components/OrderNoteSection/OrderNoteSection";

const cx = classNames.bind(styles);

interface Props {
  order: OrderType | undefined;
  onBack: (mode: OrderModeType) => void;
}

const OrderDetailForm = ({ order, onBack }: Props) => {
  if (!order) return;
  const {
    control,
    errors,
    paymentMethod,
    setValue,
    paymentMode,
    setPaymentMode,
    salePrice,
    register,
    taxRate,
    handleSubmit,
    deposit,
    onSubmitSave,
    reset,
  } = useOrderDetail(order);

  return (
    <div className={cx("orderDetail-wrapper")}>
      <OrderHeader order={order}></OrderHeader>
      <form
        className={cx("form-detail")}
        id="orderForm-detail"
        onSubmit={handleSubmit(onSubmitSave)}
      >
        <OrderCustomerSection
          customerName={order.buyerId.username ?? ""}
          phone={order.buyerId?.phone ?? ""}
          email={order.buyerId?.email ?? ""}
        ></OrderCustomerSection>
        <OrderCarSection
          image={order.carId.thumbnail ?? ""}
          name={order.carId.name}
          brand={order.carId.brand}
          price={order.unitPrice}
          year={order.carId.year ?? 0}
        ></OrderCarSection>
        <OrderSummary
          order={order}
          salePrice={salePrice}
          taxRate={taxRate}
          deposit={deposit}
        ></OrderSummary>
        <OrderPaymentSection
          mode={paymentMode}
          order={order}
          control={control}
          errors={errors}
          paymentMethod={paymentMethod}
          onChange={(value) => setValue("paymentMethod", value)}
        ></OrderPaymentSection>
        <OrderNoteSection
          register={register}
          paymentMode={paymentMode}
        ></OrderNoteSection>
      </form>
      <OrderFooter
        paymentMode={paymentMode}
        status={order.status}
        onReset={reset}
        onChangePaymentMode={(mode) => setPaymentMode(mode)}
        onChangeOrderMode={(mode) => onBack(mode)}
      ></OrderFooter>
    </div>
  );
};

export default OrderDetailForm;
