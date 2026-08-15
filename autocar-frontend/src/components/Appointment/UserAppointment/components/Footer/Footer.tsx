import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import type { Appointment } from "../../../../../types/appointment/appointment.type";

const cx = classNames.bind(styles);

interface FooterProps {
  appointment: Appointment;
  openOrder: boolean;
  setOpenOrder: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const Footer = ({
  appointment,
  openOrder,
  setOpenOrder,
  onClose,
}: FooterProps) => {
  return (
    <div className={cx("footer-action")}>
      {appointment.orderId?._id && (
        <button
          type="button"
          className={cx("btn-orderDetail")}
          onClick={() => setOpenOrder(!openOrder)}
        >
          {openOrder ? "Đóng đơn hàng" : "Xem đơn hàng"}
        </button>
      )}

      <button type="button" className={cx("close")} onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
        Huỷ
      </button>
    </div>
  );
};

export default Footer;
