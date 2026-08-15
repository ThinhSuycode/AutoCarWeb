import classNames from "classnames/bind";
import styles from "./OrderCustomerSection.module.scss";

const cx = classNames.bind(styles);

type Props = {
  customerName: string;
  phone: string;
  email: string;
};

const OrderCustomerSection = ({ customerName, phone, email }: Props) => {
  return (
    <section className={cx("section")}>
      <h3>Thông tin khách hàng</h3>

      <div className={cx("info-grid")}>
        <div>
          <label>Họ tên</label>
          <p>{customerName}</p>
        </div>

        <div>
          <label>SĐT</label>
          <p>{phone}</p>
        </div>

        <div>
          <label>Email</label>
          <p>{email}</p>
        </div>
      </div>
    </section>
  );
};

export default OrderCustomerSection;
