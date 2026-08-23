import classNames from "classnames/bind";
import styles from "./OrderDetailForm.module.scss";

import type { OrderType } from "../../../types/order/order.type";
import type { OrderModeType } from "../../Appointment/AppointmentManager/constant/useAppointmentData";

import OrderCustomerSection from "../components/OrderCustomerSection/OrderCustomerSection";
import OrderCarSection from "../components/OrderCarSection/OrderCarSection";
import OrderSummary from "../components/OrderSummary/OrderSummary";

import OrderHistory from "./components/OrderHistory/OrderHistory";
import PaymentCreate from "./components/PaymentCreate/PaymentCreate";
import OrderPaymentForm from "./components/OrderPaymentForm/OrderPaymentForm";

import useOrderDetail from "./hooks/useOrderDetail";
import OrderDetailHeader from "./components/OrderDetailHeader/OrderDetailHeader";
import OrderDetailFooter from "./components/OrderDetailFooter/OrderDetailFooter";
import CarInspectionStatus from "./components/CarInspectionStatus/CarInspectionStatus";

const cx = classNames.bind(styles);

interface Props {
  order: OrderType | undefined;
  onBack: (mode: OrderModeType) => void;
}

const OrderDetailForm = ({ order, onBack }: Props) => {
  if (!order) return null;

  const {
    openOrder,
    setOpenOrder,

    control,
    register,
    errors,
    paymentMethod,
    setValue,

    handleSubmit,
    onSubmitPayment,

    isPending,
    paymentsData,
  } = useOrderDetail(order);

  return (
    <div className={cx("orderDetail-wrapper")}>
      <OrderDetailHeader order={order}></OrderDetailHeader>
      {openOrder ? (
        <OrderPaymentForm order={order} onBack={() => setOpenOrder(false)} />
      ) : (
        <form
          className={cx("form-detail")}
          id="createPaymentForm"
          onSubmit={handleSubmit(onSubmitPayment)}
        >
          <OrderCustomerSection
            customerName={order.buyerId?.username ?? ""}
            phone={order.buyerId?.phone ?? ""}
            email={order.buyerId?.email ?? ""}
          />

          <OrderCarSection
            image={order.carId?.thumbnail ?? ""}
            name={order.carId?.name ?? ""}
            brand={order.carId?.brand ?? ""}
            price={order.unitPrice}
            year={order.carId?.year ?? 0}
          />

          <OrderSummary
            unitPrice={order.unitPrice}
            salePrice={order.salePrice}
            taxRate={order.taxRate}
            discount={order.discount}
            remainingAmount={order.remainingAmount}
            paidAmount={order.paidAmount}
            detail
            setOpenOrder={setOpenOrder}
          />
          <OrderHistory payments={paymentsData ?? []} />
          {order.status === "completed" ||
          order.status === "ready_for_delivery" ? (
            <CarInspectionStatus car={order.carId}></CarInspectionStatus>
          ) : (
            <PaymentCreate
              control={control}
              register={register}
              errors={errors}
              paymentMethod={paymentMethod ?? null}
              onChange={(value) => setValue("method", value)}
            />
          )}
        </form>
      )}
      {!openOrder && (
        <OrderDetailFooter
          onBack={onBack}
          order={order}
          isCreatingPayment={isPending}
        ></OrderDetailFooter>
      )}
    </div>
  );
};

export default OrderDetailForm;
