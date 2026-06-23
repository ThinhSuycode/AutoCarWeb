import classNames from "classnames/bind";
import styles from "../CarsManager.module.scss";
import type { CarType } from "../../../../types/car";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useConfirm } from "../../../../hooks/useConfirm";
import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";
import { useCars } from "../hooks/useForm";
import type { CarManagerType } from "../../../../types/managerStaff";

const cx = classNames.bind(styles);

interface Props {
  cars: CarManagerType[];
  carSelected: (data: CarManagerType) => void;
  carDetailSelected: (data: CarManagerType) => void;
}

const CarTable = ({ cars, carSelected, carDetailSelected }: Props) => {
  const { confirm, confirmProps } = useConfirm();
  const { deleteCar } = useCars();

  const onHandleDeleteCar = useCallback(
    async (id: string, name: string) => {
      const ok = await confirm({
        title: "Xoá xe",
        message: `Bạn có chắc muốn xoá xe "${name} - ${id}"? Hành động này không thể hoàn tác.`,
        confirmText: "Xoá",
        cancelText: "Huỷ",
      });

      if (!ok) return;

      try {
        deleteCar(id);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Xoá xe không thành công!",
        );
      }
    },
    [confirm],
  );
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
            {cars.length === 0 ? (
              <tr>
                <td colSpan={6} className={cx("empty")}>
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
                        <span className={cx("car-id")}>#{car._id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{car.brand}</td>
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
