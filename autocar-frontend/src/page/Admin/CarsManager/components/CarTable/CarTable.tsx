import classNames from "classnames/bind";
import styles from "./CarTable.module.scss";
import ConfirmDialog from "../../../../../components/ConfirmDialog/ConfirmDialog";
import useCarTable from "./hooks/useCarTable";
import LoadingData from "../../../../../components/LoadingData/LoadingData";
import EmptyState from "../../../../../components/EmtyState/EmptyState";
import type { ManagerCar } from "../../../../../types/user/manager-cars.type";

const cx = classNames.bind(styles);

interface Props {
  cars: ManagerCar[];
  carSelected: (data: ManagerCar) => void;
  isLoading: boolean;
  carDetailSelected: (data: ManagerCar) => void;
}

const CarTable = ({
  cars,
  carSelected,
  carDetailSelected,
  isLoading,
}: Props) => {
  const { confirmProps, onHandleDeleteCar } = useCarTable();
  return (
    <>
      <ConfirmDialog {...confirmProps} />
      <div className={cx("table-wrapper")}>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Xe</th>
              <th>Thương hiệu</th>
              <th>Giá</th>
              <th>Chỉnh sửa</th>
              <th>Chi tiết</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6}>
                  <LoadingData message="Đang tải..."></LoadingData>
                </td>
              </tr>
            ) : cars?.length === 0 ? (
              <td colSpan={6}>
                <EmptyState type="cars"></EmptyState>
              </td>
            ) : (
              cars.map((car) => (
                <tr key={car._id} className={cx("row")}>
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
                        <span className={cx("car-id")}>#{car._id}</span>
                      </div>
                    </div>
                  </td>
                  <td className={cx("brand")}>
                    <div>{car.brand}</div>
                  </td>
                  <td className={cx("price")}>
                    {car.price.toLocaleString("vi-VN")}₫
                  </td>

                  {/* Chỉnh sửa thông tin cơ bản */}
                  <td>
                    <button
                      className={cx("show-car")}
                      onClick={() => carSelected(car)}
                      title="Chỉnh sửa thông tin"
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </td>

                  {/* Xem/sửa chi tiết */}
                  <td>
                    <button
                      className={cx("show-carDetail")}
                      onClick={() => carDetailSelected(car)}
                      title="Xem chi tiết"
                    >
                      <i className="fa-solid fa-align-left"></i>
                    </button>
                  </td>

                  {/* Xoá */}
                  <td>
                    <button
                      onClick={() => onHandleDeleteCar(car._id, car.name)}
                      title="Xoá xe"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CarTable;
