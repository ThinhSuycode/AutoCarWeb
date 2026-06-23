import classNames from "classnames/bind";
import styles from "../CarsManager.module.scss";
import type { ColorType } from "../../../../types/car";
import { brands, colors } from "../../../../data/carsData";
import { Button } from "../../../../components/Button/Button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { carSchema, type CarFormData } from "../../../../schemas/car.schema";
import type z from "zod";

const cx = classNames.bind(styles);

type FormCarProps = {
  mode: "create" | "update";
  onCloseModal: () => void;
  onSubmit: (data: CarFormData) => void;
  defaultValues?: Partial<CarFormData>;
  creatingPending?: boolean;
  updatingPending?: boolean;
};

const FormCar = ({
  mode,
  onSubmit,
  defaultValues,
  onCloseModal,
  creatingPending,
  updatingPending,
}: FormCarProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.input<typeof carSchema>, any, z.output<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues,
  });

  return (
    <div className={cx("form-car")}>
      <div className={cx("heading")}>
        <h3>{mode === "create" ? "Thêm xe mới" : "Cập nhật xe"}</h3>

        <div className={cx("close-icon")} onClick={onCloseModal}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("form-content")}>
          {/* NAME */}
          <div className={cx("form-group")}>
            <label>Tên xe</label>

            <input type="text" {...register("name")} />

            {errors.name && (
              <span className={cx("error")}>{errors.name.message}</span>
            )}
          </div>

          {/* BRAND */}
          <div className={cx("form-group")}>
            <label>Hãng xe</label>

            <select {...register("brand")}>
              <option value="">Chọn hãng</option>

              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {errors.brand && (
              <span className={cx("error")}>{errors.brand.message}</span>
            )}
          </div>

          {/* PRICE */}
          <div className={cx("form-group")}>
            <label>Giá</label>

            <input
              type="number"
              {...register("price")}
              placeholder="Vui lòng nhập giá trị VNĐ"
            />

            {errors.price && (
              <span className={cx("error")}>{errors.price.message}</span>
            )}
          </div>

          {/* YEAR */}
          <div className={cx("form-group")}>
            <label>Năm sản xuất</label>

            <input type="number" {...register("year")} />

            {errors.year && (
              <span className={cx("error")}>{errors.year.message}</span>
            )}
          </div>

          {/* MILEAGE */}
          <div className={cx("form-group")}>
            <label>Số km đã đi</label>

            <input type="number" {...register("mileage")} />

            {errors.mileage && (
              <span className={cx("error")}>{errors.mileage.message}</span>
            )}
          </div>

          {/* TRANSMISSION */}
          <div className={cx("form-group")}>
            <label>Hộp số</label>

            <select {...register("transmission")}>
              <option value="">Chọn hộp số</option>
              <option value="Số tự động">Số tự động</option>
              <option value="Số sàn">Số sàn</option>
            </select>

            {errors.transmission && (
              <span className={cx("error")}>{errors.transmission.message}</span>
            )}
          </div>

          {/* COLOR */}
          <div className={cx("form-group")}>
            <label>Màu xe</label>

            <select {...register("color")}>
              <option value="">Chọn màu</option>

              {colors.map((cl: ColorType) => (
                <option value={cl.key} key={cl.key}>
                  {cl.title}
                </option>
              ))}
            </select>

            {errors.color && (
              <span className={cx("error")}>{errors.color.message}</span>
            )}
          </div>

          {/* IMAGE */}
          <div className={cx("form-group")}>
            <label>Link ảnh</label>

            <input {...register("image")} placeholder="https://..." />

            {errors.image && (
              <span className={cx("error")}>{errors.image.message}</span>
            )}
          </div>
        </div>

        <div className={cx("form-actions")}>
          <Button onClick={onCloseModal}>Huỷ</Button>

          <Button
            type="submit"
            disable={creatingPending || updatingPending}
            primary
            iconLeft={
              mode === "create" ? (
                <i className="fa-solid fa-plus"></i>
              ) : (
                <i className="fa-regular fa-floppy-disk"></i>
              )
            }
          >
            {mode === "create"
              ? creatingPending
                ? "Đang tạo..."
                : "Tạo thông tin"
              : updatingPending
                ? "Đang lưu..."
                : "Lưu thông tin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormCar;
