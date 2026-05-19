import classNames from "classnames/bind";
import styles from "../CarsManager.module.scss";
import type { CarDetailsType, CarType } from "../../../../types/car";
import { useCallback } from "react";
import { callApi, changeApi } from "../../../../services/api";
import toast from "react-hot-toast";
import { useConfirm } from "../../../../hooks/useConfirm";
import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";

const cx = classNames.bind(styles);

interface Props {
  cars: CarType[];
  getDataDetail?: (res: CarDetailsType) => void;
}

const CarTable = ({ cars, getDataDetail }: Props) => {
  const { confirm, confirmProps } = useConfirm();
  const onHandleShowDetail = useCallback(
    async (carId: string) => {
      if (!carId) return;
      const resDetailData = await callApi.getData<CarDetailsType>(
        `carDetail/${carId}`,
      );
      getDataDetail?.(resDetailData);
    },
    [getDataDetail],
  );

  const onHandleDeleteCar = useCallback(
    async (id: string, name: string) => {
      const ok = await confirm({
        title: "Xoá xe",
        message: `Bạn có chắc muốn xoá xe ${name} - (${id}) không? Hành động này không thể hoàn tác.`,
        confirmText: "Xoá",
        cancelText: "Huỷ",
      });

      if (!ok) return;

      try {
        await changeApi.request<CarType>("cars", "delete", undefined, id);
        toast.success("Xoá thành công dữ liệu xe!");
      } catch (error: any) {
        const msg =
          error?.response?.data?.message || "Xoá xe không thành công!";
        toast.error(msg);
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
              <th>Chi tiết</th>
              <th></th>
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
                <tr key={car.id} className={cx("row")}>
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
                    <button
                      className={cx("show-detail")}
                      onClick={() => onHandleShowDetail(car.id)}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => onHandleDeleteCar(car.id, car.name)}>
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
