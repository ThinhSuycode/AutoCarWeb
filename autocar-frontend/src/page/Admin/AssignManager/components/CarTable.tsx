import classNames from "classnames/bind";
import styles from "../AssignManager.module.scss";
import type { Car, Staff } from "../hooks/useAssignManager";

const cx = classNames.bind(styles);

interface Props {
  cars: Car[];
  staffList: Staff[];
  assigningId: string | null;
  onAssign: (carId: string, managerId: string) => void;
}

const CarTable = ({ cars, staffList, assigningId, onAssign }: Props) => (
  <div className={cx("table-wrapper")}>
    <table className={cx("table")}>
      <thead>
        <tr>
          <th>Xe</th>
          <th>Thương hiệu</th>
          <th>Giá</th>
          <th>Nhân viên phụ trách</th>
          <th>Phân bổ</th>
        </tr>
      </thead>
      <tbody>
        {cars.length === 0 ? (
          <tr>
            <td colSpan={5} className={cx("empty")}>
              Không có dữ liệu
            </td>
          </tr>
        ) : (
          cars.map((car) => (
            <tr key={car._id} className={cx("row")}>
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
                    <span className={cx("car-id")}>#{car.id}</span>
                  </div>
                </div>
              </td>

              <td>{car.brand}</td>

              <td className={cx("price")}>
                {car.price.toLocaleString("vi-VN")}₫
              </td>

              <td>
                {car.managerId ? (
                  <div className={cx("current-staff")}>
                    <img
                      src={
                        (car.managerId as Staff).avatar || "/default-avatar.png"
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
                  <span className={cx("no-staff")}>Chưa phân bổ</span>
                )}
              </td>

              {/* Dropdown */}
              <td>
                <select
                  className={cx("select-staff")}
                  value={car.managerId ? (car.managerId as Staff)._id : ""}
                  onChange={(e) => onAssign(car._id, e.target.value)}
                  disabled={assigningId === car._id}
                >
                  <option value="">-- Hủy phân bổ --</option>
                  {staffList.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.username} ({s.carCount} xe)
                    </option>
                  ))}
                </select>
                {assigningId === car._id && (
                  <span className={cx("saving")}>Đang lưu...</span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default CarTable;
