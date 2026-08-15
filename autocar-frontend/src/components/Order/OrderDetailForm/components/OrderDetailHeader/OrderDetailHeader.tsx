import classNames from "classnames/bind";

import styles from "./OrderDetailHeader.module.scss";

import type { OrderType } from "../../../../../types/order/order.type";
import { ORDER_STATUS_LABEL } from "../../../constant/orderData";

const cx = classNames.bind(styles);

interface Props {
  order: OrderType;
}

const OrderDetailHeader = ({ order }: Props) => {
  return (
    <div className={cx("header")}>
      <div className={cx("header-title")}>
        <div className={cx("icon-wrapper")}>
          <i className="fa-solid fa-basket-shopping"></i>
        </div>

        <div>
          <h2>Chi tiết hoá đơn</h2>
          <div className={cx("meta")}>
            <span>
              <i className="fa-solid fa-hashtag" />
              {order.orderCode}
            </span>

            <span>
              <i className="fa-regular fa-calendar" />
              {new Date(order.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>
      </div>

      <div className={cx("status", order.status)}>
        <i className="fa-solid fa-circle-check" />

        {ORDER_STATUS_LABEL[order.status]}
      </div>
    </div>
  );
};

export default OrderDetailHeader;
