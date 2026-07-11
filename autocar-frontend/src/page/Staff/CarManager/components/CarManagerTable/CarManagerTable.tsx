import classNames from "classnames/bind";
import styles from "./CarManagerTable.module.scss";
import type { CarManagerType } from "../../../../../types/managerStaff";
import { useUpdateManagerStatus } from "../../../../../mutations/useUpdateManagerStatus";
import { formatPrice } from "../../../../../hooks/formatPrice";
import EmptyState from "../../../../../components/EmtyState/EmptyState";
import {
  MANAGER_STATUS_MAP,
  NEXT_STATUS,
} from "../../../../../constants/managerStatus";

const cx = classNames.bind(styles);

interface Props {
  cars: CarManagerType[];
  isLoading: boolean;
}

const CarManagerTable = ({ cars, isLoading }: Props) => {
  const { mutate: updateStatus, isPending } = useUpdateManagerStatus();

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
          {isLoading ? (
            <tr>
              <td style={{ textAlign: "center" }} colSpan={7}>
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : (
            cars.map((car) => {
              const status = MANAGER_STATUS_MAP[car.managerStatus];
              const nextStatus = NEXT_STATUS[car.managerStatus];

              return (
                <tr key={car._id}>
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
            })
          )}
        </tbody>
      </table>
      {!isLoading && cars.length === 0 && <EmptyState type="cars"></EmptyState>}
    </div>
  );
};

export default CarManagerTable;
