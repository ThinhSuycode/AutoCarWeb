import classNames from "classnames/bind";
import styles from "../CarManager.module.scss";
import type {
  CarManagerType,
} from "../../../../types/managerStaff";
import { useUpdateManagerStatus } from "../../../../mutations/useUpdateManagerStatus";
import { MANAGER_STATUS_MAP, NEXT_STATUS } from "../../../../constants/managerStatus";


const cx = classNames.bind(styles);

interface Props {
  cars: CarManagerType[];
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);

const CarManagerTable = ({ cars }: Props) => {
  const { mutate: updateStatus, isPending } = useUpdateManagerStatus();

  if (cars.length === 0) {
    return (
      <div className={cx("empty-state")}>
        <i className="fa-solid fa-car-burst"></i>
        <p>Không tìm thấy xe nào</p>
      </div>
    );
  }
  console.log(cars);

  return (
    <div className={cx("table-wrapper")}>
      <table className={cx("table")}>
        <thead>
          <tr>
            <th>Xe</th>
            <th>Hãng</th>
            <th>Năm</th>
            <th>Giá</th>
            <th>Hộp số</th>
            <th>Trạng thái</th>
            <th>Cập nhật</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car) => {
            const status = MANAGER_STATUS_MAP[car.managerStatus];
            const nextStatus = NEXT_STATUS[car.managerStatus];

            return (
              <tr key={car._id}>
                {/* Xe */}
                <td>
                  <div className={cx("car-cell")}>
                    <div className={cx("car-thumb")}>
                      {car.image ? (
                        <img
                          src={car.image}
                          alt={car.name}
                          onError={(e) =>
                            ((e.target as HTMLImageElement).style.display =
                              "none")
                          }
                        />
                      ) : (
                        <i className="fa-solid fa-car"></i>
                      )}
                    </div>
                    <span className={cx("car-name")}>{car.name}</span>
                  </div>
                </td>

                {/* Hãng */}
                <td>
                  <span className={cx("brand-badge")}>{car.brand}</span>
                </td>

                {/* Năm */}
                <td>{car.year}</td>

                {/* Giá */}
                <td className={cx("price")}>{formatPrice(car.price)}</td>

                {/* Hộp số */}
                <td>{car.transmission ?? "—"}</td>

                {/* Trạng thái hiện tại */}
                <td>
                  <span className={cx("status-badge", status.className)}>
                    <i className={`fa-solid ${status.icon}`}></i>
                    {status.label}
                  </span>
                </td>

                {/* Nút cập nhật → trạng thái tiếp theo */}
                <td>
                  {nextStatus ? (
                    <button
                      className={cx("next-btn")}
                      disabled={isPending}
                      onClick={() =>
                        updateStatus({
                          id: car._id,
                          managerStatus: nextStatus,
                        })
                      }
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                      {MANAGER_STATUS_MAP[nextStatus].label}
                    </button>
                  ) : (
                    <span className={cx("done-label")}>
                      <i className="fa-solid fa-check"></i>
                      Xong
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CarManagerTable;
