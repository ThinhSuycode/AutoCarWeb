import classNames from "classnames/bind";
import styles from "../CarsManager.module.scss";
import { useEffect, useRef, useState } from "react";
import type { CarDetailsType } from "../../../../types/car";
import { Button } from "../../../../components/Button/Button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import LoadingData from "../../../../components/LoadingData/LoadingData";
import {
  carDetailSchema,
  type CarDetailFormData,
} from "../../../../schemas/carDetail.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EmptyData from "../../../../components/EmtyData/EmptyData";

const cx = classNames.bind(styles);

interface Props {
  carDetail: CarDetailsType | null;
  onCloseModal: () => void;
  defaultValues?: CarDetailsType;
  isLoading: boolean;
  onSubmit: (data: CarDetailFormData) => void;
}
const FormDetail = ({
  carDetail,
  defaultValues,
  onCloseModal,
  onSubmit,
  isLoading,
}: Props) => {
  const [newFeature, setNewFeature] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  console.log(carDetail);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<
    z.input<typeof carDetailSchema>,
    any,
    z.output<typeof carDetailSchema>
  >({
    resolver: zodResolver(carDetailSchema),
    defaultValues,
  });

  useEffect(() => {
    if (carDetail) {
      reset(carDetail);
    }
  }, [carDetail, reset]);

  const features = watch("features") || [];
  const specs = watch("specs") || [];
  const images = watch("images") || [];

  const handleAddFeature = () => {
    const trimmed = newFeature.trim();

    if (!trimmed) return;

    setValue("features", [...features, trimmed]);

    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    setValue(
      "features",
      features.filter((_, i) => i !== index),
    );
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleAddSpecGroup = () => {
    setValue("specs", [
      ...specs,
      {
        title: "",
        items: [{ label: "", value: "" }],
      },
    ]);
  };

  const handleRemoveSpecGroup = (groupIndex: number) => {
    setValue(
      "specs",
      specs.filter((_, i) => i !== groupIndex),
    );
  };

  const handleSpecGroupTitleChange = (groupIndex: number, value: string) => {
    const updated = specs.map((group, i) =>
      i === groupIndex
        ? {
            ...group,
            title: value,
          }
        : group,
    );

    setValue("specs", updated);
  };

  const handleSpecItemChange = (
    groupIndex: number,
    itemIndex: number,
    field: "label" | "value",
    value: string,
  ) => {
    const updated = specs.map((group, gi) =>
      gi === groupIndex
        ? {
            ...group,
            items: group.items.map((item, ii) =>
              ii === itemIndex
                ? {
                    ...item,
                    [field]: value,
                  }
                : item,
            ),
          }
        : group,
    );

    setValue("specs", updated);
  };

  const handleAddSpecItem = (groupIndex: number) => {
    const updated = specs.map((group, gi) =>
      gi === groupIndex
        ? {
            ...group,
            items: [
              ...group.items,
              {
                label: "",
                value: "",
              },
            ],
          }
        : group,
    );

    setValue("specs", updated);
  };

  const handleRemoveSpecItem = (groupIndex: number, itemIndex: number) => {
    const updated = specs.map((group, gi) =>
      gi === groupIndex
        ? {
            ...group,
            items: group.items.filter((_, ii) => ii !== itemIndex),
          }
        : group,
    );

    setValue("specs", updated);
  };

  // ─────────────────────────────────────────────
  // Images
  // ─────────────────────────────────────────────

  const handleRemoveImage = (index: number) => {
    setValue(
      "images",
      images.filter((_, i) => i !== index),
    );
  };

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (!files.length) return;

    e.target.value = "";

    const formPayload = new FormData();

    files.forEach((file) => {
      formPayload.append("images", file);
    });

    setIsUploading(true);

    const toastId = toast.loading("Đang tải ảnh lên...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_KEYS}/upload/images`,
        {
          method: "POST",
          body: formPayload,
        },
      );

      if (!res.ok) {
        throw new Error();
      }

      const { urls }: { urls: string[] } = await res.json();

      setValue("images", [...images, ...urls], { shouldValidate: true });
      toast.success(`Đã tải lên ${urls.length} ảnh!`, {
        id: toastId,
      });
    } catch {
      toast.error("Tải ảnh thất bại!", {
        id: toastId,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // ─────────────────────────────────────────────
  // Empty state
  // ─────────────────────────────────────────────

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
              {...register("name")}
              readOnly
              style={{ opacity: "0.8" }}
            />
            {errors.name && (
              <span className={cx("error")}>{errors.name.message}</span>
            )}
          </div>

          {/* BRAND */}
          <div className={cx("form-group")}>
            <label>Thương hiệu</label>

            <input
              type="text"
              {...register("brand")}
              readOnly
              style={{ opacity: "0.8" }}
            />
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
              readOnly
              style={{ opacity: "0.8" }}
            />
            {errors.price && (
              <span className={cx("error")}>{errors.price.message}</span>
            )}
          </div>

          {/* YEAR */}
          <div className={cx("form-group")}>
            <label>Năm sản xuất</label>

            <input
              type="number"
              {...register("year")}
              readOnly
              style={{ opacity: "0.8" }}
            />
            {errors.year && (
              <span className={cx("error")}>{errors.year.message}</span>
            )}
          </div>

          {/* MILEAGE */}
          <div className={cx("form-group")}>
            <label>Số km</label>

            <input
              type="number"
              {...register("mileage")}
              readOnly
              style={{ opacity: "0.8" }}
            />
            {errors.mileage && (
              <span className={cx("error")}>{errors.mileage.message}</span>
            )}
          </div>

          {/* TRANSMISSION */}
          <div className={cx("form-group")}>
            <label>Hộp số</label>

            <select {...register("transmission")} style={{ opacity: "0.8" }}>
              <option value="Số tự động">Số tự động</option>

              <option value="Số sàn">Số sàn</option>
            </select>
            {errors.transmission && (
              <span className={cx("error")}>{errors.transmission.message}</span>
            )}
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

              <Button type="button" onClick={handleAddFeature}>
                <i className="fa-solid fa-plus"></i>
                Thêm
              </Button>
            </div>
          </div>

          {/* IMAGES */}
          <div className={cx("form-group")}>
            <label>Hình ảnh</label>

            <div className={cx("images-list")}>
              {images.map((img, index) => (
                <div key={index} className={cx("image-item")}>
                  <img src={img} alt="car" />

                  <span onClick={() => handleRemoveImage(index)}>
                    <i className="fa-solid fa-x"></i>
                  </span>
                </div>
              ))}

              <div
                className={cx("image-add")}
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="fa-solid fa-plus"></i>

                <span>{isUploading ? "Đang tải..." : "Thêm ảnh"}</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleAddImages}
              />
              {errors.images && (
                <span className={cx("error")}>{errors.images.message}</span>
              )}
            </div>
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

                    <Button
                      type="button"
                      onClick={() => handleAddSpecItem(groupIndex)}
                    >
                      <i className="fa-solid fa-plus"></i>
                      Thêm dòng
                    </Button>
                  </div>
                ))}

                <Button onClick={handleAddSpecGroup}>
                  <i className="fa-solid fa-plus"></i>
                  <span>Thêm nhóm thông số</span>
                </Button>
              </>
            ) : (
              <div className={cx("spec-empty")}>
                <p>Chưa có thông số kỹ thuật</p>

                <Button type="button" onClick={handleAddSpecGroup}>
                  <i className="fa-solid fa-plus"></i>
                  Thêm nhóm thông số
                </Button>
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

export default FormDetail;
