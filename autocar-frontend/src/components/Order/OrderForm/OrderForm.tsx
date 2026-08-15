import classNames from "classnames/bind";
import styles from "./OrderForm.module.scss";
import OrderCustomerSection from "../components/OrderCustomerSection/OrderCustomerSection";
import type { Appointment } from "../../../types/appointment/appointment.type";
import OrderCarSection from "../components/OrderCarSection/OrderCarSection";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import OrderPaymentSection from "../components/OrderPaymentSection/OrderPaymentSection";
import useOrderForm from "./hooks/useOrderForm";
import OrderNoteSection from "../components/OrderNoteSection/OrderNoteSection";
import type { CreateOrderDto } from "../../../schemas/order.schema";
import type { FieldError } from "react-hook-form";

const cx = classNames.bind(styles);

interface OrderFormProps {
  appointment: Appointment;
  setBack: (status: boolean) => void;
  onClose: () => void;
}

const OrderForm = ({ appointment, setBack, onClose }: OrderFormProps) => {
  const contactCurrent = appointment.contactId ?? null;

  const priceCurrent = contactCurrent.carPrice;

  const defaultValues: Partial<CreateOrderDto> = {
    salePrice: priceCurrent,
    taxRate: 10,
    discount: 0,
    status: "pending",
    note: "",
  };
  const {
    register,
    handleSubmit,
    onSubmit,
    discount,
    salePrice,
    control,
    taxRate,
    errors,
  } = useOrderForm({
    defaultValues,
    appointment,
    onClose,
  });

  return (
    <div className={cx("orderForm-wrapper")}>
      <div className={cx("header")}>
        <h2>TẠO HOÁ ĐƠN XE</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="order-form"
        className={cx("main")}
      >
        <OrderCustomerSection
          customerName={contactCurrent.name}
          phone={contactCurrent.phone}
          email={contactCurrent.buyerId?.email ?? ""}
        ></OrderCustomerSection>
        <OrderCarSection
          image={contactCurrent.carId?.thumbnail ?? ""}
          name={contactCurrent.carName}
          brand={contactCurrent.carBrand}
          price={contactCurrent.carPrice}
          year={contactCurrent.carId?.year ?? 0}
        ></OrderCarSection>
        <OrderSummary
          unitPrice={priceCurrent}
          salePrice={salePrice ?? defaultValues.salePrice}
          discount={discount ?? defaultValues.discount}
          taxRate={taxRate ?? defaultValues.taxRate}
        ></OrderSummary>
        <OrderPaymentSection
          mode="create"
          control={control}
          errors={errors as FieldError | undefined}
        ></OrderPaymentSection>
        <OrderNoteSection register={register}></OrderNoteSection>
      </form>
      <div className={cx("footer-actions")}>
        <button
          type="button"
          className={cx("btn-back")}
          onClick={() => setBack(false)}
        >
          <span>
            <i className="fa-solid fa-arrow-left"></i>
          </span>
          <span>Quay lại</span>
        </button>
        <button type="submit" form="order-form" className={cx("btn-create")}>
          <span>
            <i className="fa-regular fa-floppy-disk"></i>
          </span>
          <span>Tạo hoá đơn</span>
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
