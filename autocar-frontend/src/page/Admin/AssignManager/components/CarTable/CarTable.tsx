import classNames from "classnames/bind";
import styles from "./CarTable.module.scss";
import { MANAGER_STATUS_MAP } from "../../../../../constants/managerStatus";
import LoadingData from "../../../../../components/LoadingData/LoadingData";
import type { Staff } from "../../../../../types/staff/staff.type";
import type { ManagerCar } from "../../../../../types/user/manager-cars.type";

const cx = classNames.bind(styles);

interface Props {
  cars: ManagerCar[];
  staffList: Staff[];
  assigningId: string | null;
  onManagerChange: (carId: string, managerId: string, username: string) => void;
  isLoading: boolean;
}

const CarTable = ({
  cars,
  staffList,
  assigningId,
  onManagerChange,
  isLoading,
}: Props) => {
  if (isLoading) {
    return <LoadingData message="Đang tải..." />;
  }

  return (
    <div className={cx("table-content")}>
      <div className={cx("table-wrapper")}>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Xe</th>
              <th>Thương hiệu</th>
              <th>Giá</th>
              <th>Nhân viên phụ trách</th>
              <th>Phân bổ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan={6} className={cx("empty")}>
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              cars.map((car) => {
                const manager = car.managerId as Staff | null;

                const statusInfo = car.managerStatus
                  ? MANAGER_STATUS_MAP[car.managerStatus]
                  : null;

                return (
                  <tr key={car._id} className={cx("row")}>
                    {/* Xe */}
                    <td>
                      <div className={cx("car-info")}>
                        {car.thumbnail && (
                          <img
                            src={car.thumbnail}
                            alt={car.name}
                            className={cx("car-img")}
                          />
                        )}

                        <div>
                          <p className={cx("car-name")}>{car.name}</p>

                          <span className={cx("car-id")}>
                            #{car._id.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Thương hiệu */}
                    <td>
                      <span className={cx("brand-tag")}>{car.brand}</span>
                    </td>

                    {/* Giá */}
                    <td className={cx("price")}>
                      {car.price.toLocaleString("vi-VN")}₫
                    </td>

                    {/* Nhân viên */}
                    <td>
                      {manager ? (
                        <div className={cx("current-staff")}>
                          <img
                            src={manager.avatar || "/default-avatar.png"}
                            alt={manager.username}
                          />

                          <div>
                            <p>{manager.username}</p>

                            <span>
                              {manager.staffInfo?.position ?? "Nhân viên"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className={cx("no-staff")}>
                          <i className="fa-solid fa-user-slash"></i>
                          Chưa phân bổ
                        </span>
                      )}
                    </td>

                    {/* Dropdown */}
                    <td>
                      <div className={cx("assign-cell")}>
                        <select
                          className={cx("select-staff")}
                          value={manager?._id ?? ""}
                          disabled={assigningId === car._id}
                          onChange={(e) =>
                            onManagerChange(
                              car._id,
                              e.target.value,
                              manager?.username ?? "",
                            )
                          }
                        >
                          <option value="">— Hủy phân bổ —</option>

                          {staffList.map((staff) => (
                            <option key={staff._id} value={staff._id}>
                              {`${staff.username} - ${staff.carCount} nhiệm vụ`}
                            </option>
                          ))}
                        </select>

                        {assigningId === car._id && (
                          <span className={cx("saving")}>
                            <i className="fa-solid fa-spinner fa-spin"></i>
                            Đang lưu...
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Trạng thái */}
                    <td>
                      {statusInfo ? (
                        <span className={cx("status-badge", car.managerStatus)}>
                          <i className={`fa-solid ${statusInfo.icon}`}></i>

                          {statusInfo.label}
                        </span>
                      ) : (
                        <span className={cx("status-badge", "none")}>
                          <i className="fa-solid fa-minus"></i>
                          Chưa có
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarTable;
