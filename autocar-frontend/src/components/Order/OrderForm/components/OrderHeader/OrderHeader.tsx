import classNames from "classnames/bind";

import styles from "./OrderHeader.module.scss";

import type { OrderType } from "../../../../../types/order/order.type";

const cx = classNames.bind(styles);

interface Props {
  order: OrderType;
}

const OrderHeader = ({ order }: Props) => {
  return (
    <div className={cx("header")}>
      <div className={cx("header-title")}>
        <div className={cx("icon-wrapper")}>
          <i className="fa-solid fa-basket-shopping"></i>
        </div>

        <div>
          <h2>Tạo hoá đơn</h2>
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

      {/* <div className={cx("status", order.status)}>
        <i className="fa-solid fa-circle-check" />

        {ORDER_STATUS_LABEL[order.status]}
      </div> */}
    </div>
  );
};

export default OrderHeader;
