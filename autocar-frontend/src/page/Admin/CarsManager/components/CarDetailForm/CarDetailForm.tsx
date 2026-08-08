import classNames from "classnames/bind";
import styles from "./CarDetailForm.module.scss";
import { Button } from "../../../../../components/Button/Button";
import LoadingData from "../../../../../components/LoadingData/LoadingData";
import { useCarDetail } from "./hooks/useCarDetailForm";
import { Controller } from "react-hook-form";
import { ImagesEditor } from "./components/ImagesEditor";
import type { CarDetailsType } from "../../../../../types/car/car-detail.type";
import type { CreateCarDetailDto } from "../../../../../schemas/carDetail.schema";

const cx = classNames.bind(styles);

interface Props {
  carDetail: CarDetailsType | null;
  onCloseModal: () => void;
  defaultValues?: CarDetailsType;
  isLoading: boolean;
  onSubmit: (data: CreateCarDetailDto) => void;
}
const CarDetailForm = ({
  carDetail,
  defaultValues,
  onCloseModal,
  onSubmit,
  isLoading,
}: Props) => {
  const {
    register,
    handleSubmit,
    errors,
    features,
    newFeature,
    setNewFeature,
    handleAddFeature,
    handleRemoveFeature,
    handleFeatureKeyDown,
    specs,
    handleAddSpecGroup,
    handleRemoveSpecGroup,
    handleSpecGroupTitleChange,
    handleSpecItemChange,
    handleAddSpecItem,
    handleRemoveSpecItem,
    isUploading,
    fileInputRef,
    handleAddImages,
    control,
  } = useCarDetail({ carDetail, defaultValues });
  if (isLoading) {
    return <LoadingData message="Đang tải dữ liệu" color></LoadingData>;
  }
  if (!carDetail) {
    return <LoadingData message="Không tìm thấy dữ liệu" color></LoadingData>;
  }

  return (
    <div className={cx("form-detail")}>
      <div className={cx("heading")}>
        <h3>Xem chi tiết</h3>
        <div className={cx("close-icon")} onClick={onCloseModal}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("form-content")}>
          {/* NAME */}
          <div className={cx("form-group")}>
            <label>Tên xe</label>

            <input
              type="text"
              value={carDetail.carId.name ?? ""}
              readOnly
              style={{ opacity: "0.8" }}
            />
          </div>

          {/* BRAND */}
          <div className={cx("form-group")}>
            <label>Thương hiệu</label>

            <input
              type="text"
              value={carDetail.carId.brand ?? ""}
              readOnly
              style={{ opacity: "0.8" }}
            />
          </div>

          {/* PRICE */}
          <div className={cx("form-group")}>
            <label>Giá</label>

            <input
              type="number"
              value={carDetail.carId.price ?? ""}
              readOnly
              style={{ opacity: "0.8" }}
            />
          </div>

          {/* YEAR */}
          <div className={cx("form-group")}>
            <label>Năm sản xuất</label>

            <input
              type="number"
              value={carDetail.carId.year ?? ""}
              readOnly
              style={{ opacity: "0.8" }}
            />
          </div>

          {/* MILEAGE */}
          <div className={cx("form-group")}>
            <label>Số km</label>

            <input
              type="number"
              value={carDetail.carId.mileage ?? ""}
              readOnly
              style={{ opacity: "0.8" }}
            />
          </div>

          {/* TRANSMISSION */}
          <div className={cx("form-group")}>
            <label>Hộp số</label>

            <input
              type="text"
              value={carDetail.carId.transmission ?? ""}
              readOnly
              style={{ opacity: "0.8" }}
            />
          </div>

          {/* LOCATION */}
          <div className={cx("form-group")}>
            <label>Khu vực</label>

            <input type="text" {...register("location")} />
            {errors.location && (
              <span className={cx("error")}>{errors.location.message}</span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className={cx("form-group")}>
            <label>Mô tả</label>

            <textarea {...register("description")} />
            {errors.description && (
              <span className={cx("error")}>{errors.description.message}</span>
            )}
          </div>

          {/* FEATURES */}
          <div className={cx("form-group")}>
            <label>Tính năng</label>

            <div className={cx("features-list")}>
              {features.map((feature, index) => (
                <span key={index} className={cx("feature-item")}>
                  {feature}

                  <button
                    type="button"
                    className={cx("feature-remove")}
                    onClick={() => handleRemoveFeature(index)}
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                </span>
              ))}
            </div>

            <div className={cx("feature-add")}>
              <input
                type="text"
                value={newFeature}
                placeholder="Nhập tính năng..."
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={handleFeatureKeyDown}
              />

              <button onClick={handleAddFeature}>
                <i className="fa-solid fa-plus"></i>
                Thêm
              </button>
            </div>
          </div>

          {/* IMAGES */}
          <div className={cx("form-group")}>
            <label>Hình ảnh</label>
            <Controller
              control={control}
              name="images"
              render={({ field }) => (
                <ImagesEditor
                  value={field.value ?? []}
                  onChange={field.onChange}
                  isUploading={isUploading}
                  fileInputRef={fileInputRef}
                  onAddImages={handleAddImages}
                  error={errors.images?.message}
                />
              )}
            />
          </div>
          {/* SPECS */}
          <div className={cx("form-group")}>
            <label>Thông số kỹ thuật</label>

            {specs.length > 0 ? (
              <>
                {specs.map((group, groupIndex) => (
                  <div key={groupIndex} className={cx("spec-group")}>
                    <div className={cx("spec-group-header")}>
                      <input
                        type="text"
                        value={group.title}
                        placeholder="Tên nhóm"
                        onChange={(e) =>
                          handleSpecGroupTitleChange(groupIndex, e.target.value)
                        }
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveSpecGroup(groupIndex)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>

                    {group.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={cx("spec-item-row")}>
                        <input
                          type="text"
                          value={item.label}
                          placeholder="Tên thông số"
                          onChange={(e) =>
                            handleSpecItemChange(
                              groupIndex,
                              itemIndex,
                              "label",
                              e.target.value,
                            )
                          }
                        />

                        <input
                          type="text"
                          value={item.value}
                          placeholder="Giá trị"
                          onChange={(e) =>
                            handleSpecItemChange(
                              groupIndex,
                              itemIndex,
                              "value",
                              e.target.value,
                            )
                          }
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveSpecItem(groupIndex, itemIndex)
                          }
                        >
                          <i className="fa-solid fa-x"></i>
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className={cx("btn-addRow")}
                      onClick={() => handleAddSpecItem(groupIndex)}
                    >
                      <i className="fa-solid fa-plus"></i>
                      Thêm dòng
                    </button>
                  </div>
                ))}

                <Button onClick={handleAddSpecGroup}>
                  <i className="fa-solid fa-plus"></i>
                  Thêm nhóm thông số
                </Button>
              </>
            ) : (
              <div className={cx("spec-empty")}>
                <p>Chưa có thông số kỹ thuật</p>

                <button type="button" onClick={handleAddSpecGroup}>
                  <i className="fa-solid fa-plus"></i>
                  Thêm nhóm thông số
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className={cx("footer-act")}>
          <Button type="button" onClick={onCloseModal}>
            Huỷ
          </Button>

          <Button
            type="submit"
            iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
          >
            Lưu thông tin
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CarDetailForm;
