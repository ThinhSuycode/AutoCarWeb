import classNames from "classnames/bind";
import styles from "./OrderConfirmation.module.scss";
import useOrderConfirmation from "./hooks/useOrderConfirmation";

const cx = classNames.bind(styles);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

interface Props {
  id: string;
}

const OrderConfirmation = ({ id }: Props) => {
  const { order, isLoading, handleConfirm, isConfirm } =
    useOrderConfirmation(id);

  if (isLoading) {
    return <div>Đang tải thông tin đơn hàng...</div>;
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng.</div>;
  }

  const isPending = order.status === "pending";

  return (
    <div className={cx("order-page")}>
      <div className={cx("order-container")}>
        {/* HEADER */}
        <div className={cx("order-header")}>
          <div>
            <span className={cx("label")}>Mã đơn hàng</span>

            <h1>{order.orderCode}</h1>
          </div>

          <span className={cx("status", `status-${order.status}`)}>
            {order.status === "pending"
              ? "Chờ xác nhận"
              : order.status === "confirmed"
                ? "Đã xác nhận"
                : order.status}
          </span>
        </div>

        {/* CUSTOMER */}
        <section className={cx("section")}>
          <h2>Thông tin khách hàng</h2>

          <div className={cx("info-grid")}>
            <div>
              <span>Họ tên</span>
              <strong>{order.buyerSnapshot.username}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{order.buyerSnapshot.email}</strong>
            </div>

            <div>
              <span>Số điện thoại</span>
              <strong>{order.buyerSnapshot.phone}</strong>
            </div>
          </div>
        </section>

        {/* CAR */}
        <section className={cx("section")}>
          <h2>Thông tin xe</h2>

          <div className={cx("car-info")}>
            <div className={cx("car-image")}>
              {order.carId.thumbnail && (
                <img src={order.carId.thumbnail} alt={order.carSnapshot.name} />
              )}
            </div>

            <div className={cx("car-content")}>
              <h3>{order.carSnapshot.name}</h3>

              <p>
                Thương hiệu: <strong>{order.carSnapshot.brand}</strong>
              </p>

              <p>
                Năm sản xuất: <strong>{order.carSnapshot.year}</strong>
              </p>

              <p>
                Màu xe: <strong>{order.carSnapshot.color}</strong>
              </p>
            </div>
          </div>
        </section>

        {/* PRICE */}
        <section className={cx("section")}>
          <h2>Chi tiết đơn hàng</h2>

          <div className={cx("price-list")}>
            <div>
              <span>Giá niêm yết</span>
              <strong>{formatCurrency(order.unitPrice)}</strong>
            </div>

            <div>
              <span>Giảm giá</span>
              <strong className={cx("discount")}>
                - {formatCurrency(order.discount)}
              </strong>
            </div>

            <div>
              <span>Giá bán</span>
              <strong>{formatCurrency(order.salePrice)}</strong>
            </div>

            <div>
              <span>VAT ({order.taxRate}%)</span>

              <strong>{formatCurrency(order.tax)}</strong>
            </div>

            <div className={cx("total")}>
              <span>Tổng thanh toán</span>

              <strong>{formatCurrency(order.totalAmount)}</strong>
            </div>

            <div className={cx("payment-total")}>
              <div className={cx("paidAmount")}>
                <span>Tổng tiền đã thanh toán: </span>
                <strong>{formatCurrency(order.paidAmount)}</strong>
              </div>
              <div className={cx("remainingAmount")}>
                <span>Số tiền cần thanh toán: </span>
                <strong>{formatCurrency(order.remainingAmount)}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* NOTE */}
        {order.note && (
          <section className={cx("section")}>
            <h2>Ghi chú</h2>

            <p className={cx("note")}>{order.note}</p>
          </section>
        )}

        {/* ACTION */}
        {isPending && (
          <div className={cx("actions")}>
            <button type="button" className={cx("cancel-button")}>
              Từ chối
            </button>

            <button
              type="button"
              className={cx("confirm-button")}
              onClick={handleConfirm}
              disabled={isConfirm}
            >
              {isConfirm ? "Đang xác nhận..." : "Xác nhận mua xe"}
            </button>
          </div>
        )}

        {/* CONFIRMED */}
        {order.status === "confirmed" && (
          <div className={cx("confirmed-message")}>
            <strong>Đơn hàng đã được xác nhận</strong>

            <p>
              Nhân viên sẽ tiếp tục xử lý và hướng dẫn bạn thực hiện thanh toán.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
