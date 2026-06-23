import classNames from "classnames/bind";
import styles from "../AssignManager.module.scss";
import type { CarManagerType } from "../../../../types/managerStaff";
import type { Staff } from "../../../../types/car";
import { MANAGER_STATUS_MAP } from "../../../../constants/managerStatus";

const cx = classNames.bind(styles);

interface Props {
  cars: CarManagerType[];
  staffList: Staff[];
  assigningId: string | null;
  onAssign: (carId: string, managerId: string) => void;
}

const CarTable = ({ cars, staffList, assigningId, onAssign }: Props) => {
  return (
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
              // ✅ dùng managerStatus (key) làm modifier SCSS, không dùng icon
              const statusInfo = car.managerStatus
                ? MANAGER_STATUS_MAP[car.managerStatus]
                : null;

              return (
                <tr key={car._id} className={cx("row")}>
                  {/* Xe */}
                  <td>
                    <div className={cx("car-info")}>
                      {car.image && (
                        <img
                          src={car.image}
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
                    {car.managerId ? (
                      <div className={cx("current-staff")}>
                        <img
                          src={
                            (car.managerId as Staff).avatar ||
                            "/default-avatar.png"
                          }
                          alt=""
                        />
                        <div>
                          <p>{(car.managerId as Staff).username}</p>
                          <span>
                            {(car.managerId as Staff).staffInfo?.position ||
                              "Nhân viên"}
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

                  {/* Dropdown phân bổ */}
                  <td>
                    <div className={cx("assign-cell")}>
                      <select
                        className={cx("select-staff")}
                        value={
                          car.managerId ? (car.managerId as Staff)._id : ""
                        }
                        onChange={(e) => onAssign(car._id, e.target.value)}
                        disabled={assigningId === car._id}
                      >
                        <option value="">— Hủy phân bổ —</option>
                        {staffList.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.username} ({s.carCount} xe)
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

                  {/* Trạng thái — modifier = managerStatus key */}
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
  );
};

export default CarTable;
