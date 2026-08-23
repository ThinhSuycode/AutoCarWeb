import classNames from "classnames/bind";
import styles from "./CarForm.module.scss";
import { Button } from "../../../../../components/Button/Button";
import { useCarForm } from "./hooks/useCarForm";
import { brands, colors } from "../../../../../constants/carData";
import type { CreateCarDto } from "../../../../../schemas/car.schema";
import { BODY_TYPES, FUEL } from "../../../../../types/car/car.constant";
import MoneyInput from "../../../../../components/MoneyInput/MoneyInput";

const cx = classNames.bind(styles);

type FormCarProps = {
  mode: "create" | "update";
  onCloseModal: () => void;
  onSubmit: (data: CreateCarDto) => void;
  defaultValues?: Partial<CreateCarDto>;
  creatingPending?: boolean;
  updatingPending?: boolean;
};

const CarForm = ({
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
    control,
    errors,
    isUploading,
    fileInputRef,
    handleUploadImage,
    watch,
  } = useCarForm({ defaultValues });

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
                <option key={b.key} value={b.label}>
                  {b.label}
                </option>
              ))}
            </select>

            {errors.brand && (
              <span className={cx("error")}>{errors.brand.message}</span>
            )}
          </div>
          <div className={cx("form-group")}>
            <label>Loại xe</label>

            <div className={cx("checkbox-group")}>
              {BODY_TYPES.map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    {...register("bodyType")}
                  />
                  {type}
                </label>
              ))}
            </div>

            {errors.bodyType && (
              <span className={cx("error")}>{errors.bodyType.message}</span>
            )}
          </div>
          {/* PRICE */}
          <div className={cx("form-group")}>
            <MoneyInput
              label="Giá"
              name="price"
              placeholder="Vui lòng nhập giá trị VNĐ"
              control={control}
              error={errors.price}
            />
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

              {colors.map((cl) => (
                <option value={cl.key} key={cl.key}>
                  {cl.title}
                </option>
              ))}
            </select>

            {errors.color && (
              <span className={cx("error")}>{errors.color.message}</span>
            )}
          </div>
          <div className={cx("form-group")}>
            <label>Nhiên liệu</label>

            <select {...register("fuel")}>
              <option value="">Chọn nhiên liệu</option>

              {FUEL.map((fuel) => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>

            {errors.fuel && (
              <span className={cx("error")}>{errors.fuel.message}</span>
            )}
          </div>

          <div className={cx("form-group")}>
            <label>Động cơ</label>

            <input
              type="text"
              placeholder="2.0 Turbo"
              {...register("engine")}
            />

            {errors.engine && (
              <span className={cx("error")}>{errors.engine.message}</span>
            )}
          </div>

          <div className={cx("form-group")}>
            <label>Số chỗ ngồi</label>

            <input type="number" {...register("seats")} />

            {errors.seats && (
              <span className={cx("error")}>{errors.seats.message}</span>
            )}
          </div>
          <div className={cx("form-group")}>
            <label>Xuất xứ</label>

            <select {...register("origin")}>
              <option value="">Chọn xuất xứ</option>
              <option value="Nhập khẩu">Nhập khẩu</option>
              <option value="Lắp ráp trong nước">Lắp ráp trong nước</option>
            </select>

            {errors.origin && (
              <span className={cx("error")}>{errors.origin.message}</span>
            )}
          </div>
          {/* IMAGE */}
          <div className={cx("form-group")}>
            <label>Upload ảnh</label>
            <div className={cx("upload-image")}>
              <input {...register("thumbnail")} placeholder="https://..." />
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleUploadImage}
              />

              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disable={isUploading}
              >
                <i className="fa-regular fa-image"></i>
                {isUploading ? "Đang tải..." : "Chọn ảnh"}
              </Button>
            </div>

            {errors.thumbnail && (
              <span className={cx("error")}>{errors.thumbnail.message}</span>
            )}
          </div>
          {watch("thumbnail") && (
            <div className={cx("thumbnail-preview")}>
              {watch("thumbnail") && <img src={watch("thumbnail")} alt="" />}
            </div>
          )}
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

export default CarForm;
