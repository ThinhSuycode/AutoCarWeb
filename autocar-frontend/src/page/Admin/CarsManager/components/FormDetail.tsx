import classNames from "classnames/bind";
import styles from "../CarsManager.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CarDetailsType } from "../../../../types/car";
import { Button } from "../../../../components/Button/Button";
import { changeApi } from "../../../../services/api";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

interface Props {
  carDetail: CarDetailsType | null;
  onClose: () => void;
}

const FormDetail = ({ carDetail, onClose }: Props) => {
  const [formData, setFormData] = useState<CarDetailsType | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    if (carDetail) {
      setFormData(carDetail);
    }
  }, [carDetail]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            features: prev.features?.filter((_, i) => i !== index),
          }
        : prev,
    );
  };
  const handleAddSpecGroup = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        specs: [
          ...(prev.specs ?? []),
          { title: "", items: [{ label: "", value: "" }] },
        ],
      };
    });
  };

  const handleRemoveSpecGroup = (groupIndex: number) => {
    setFormData((prev) => {
      if (!prev?.specs) return prev;
      return {
        ...prev,
        specs: prev.specs.filter((_, gi) => gi !== groupIndex),
      };
    });
  };

  const handleAddFeature = () => {
    const trimmed = newFeature.trim();
    if (!trimmed) return;

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            features: [...(prev.features ?? []), trimmed],
          }
        : prev,
    );

    setNewFeature("");
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleSpecGroupTitleChange = (groupIndex: number, val: string) => {
    setFormData((prev) => {
      if (!prev?.specs) return prev;

      const specs = prev.specs.map((group, gi) =>
        gi !== groupIndex ? group : { ...group, title: val },
      );

      return { ...prev, specs };
    });
  };

  const handleSpecItemChange = (
    groupIndex: number,
    itemIndex: number,
    field: "label" | "value",
    val: string,
  ) => {
    setFormData((prev) => {
      if (!prev?.specs) return prev;

      const specs = prev.specs.map((group, gi) =>
        gi !== groupIndex
          ? group
          : {
              ...group,
              items: group.items.map((item, ii) =>
                ii !== itemIndex ? item : { ...item, [field]: val },
              ),
            },
      );

      return { ...prev, specs };
    });
  };

  const handleRemoveSpecItem = (groupIndex: number, itemIndex: number) => {
    setFormData((prev) => {
      if (!prev?.specs) return prev;

      const specs = prev.specs.map((group, gi) =>
        gi !== groupIndex
          ? group
          : {
              ...group,
              items: group.items.filter((_, ii) => ii !== itemIndex),
            },
      );

      return { ...prev, specs };
    });
  };

  const handleAddSpecItem = (groupIndex: number) => {
    setFormData((prev) => {
      if (!prev?.specs) return prev;

      const specs = prev.specs.map((group, gi) =>
        gi !== groupIndex
          ? group
          : {
              ...group,
              items: [...group.items, { label: "", value: "" }],
            },
      );

      return { ...prev, specs };
    });
  };
  const handleRemoveImage = (index: number) => {
    setFormData((prev) =>
      prev
        ? { ...prev, images: prev.images?.filter((_, i) => i !== index) }
        : prev,
    );
  };

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    // Reset input để có thể chọn lại cùng file
    e.target.value = "";

    const formPayload = new FormData();
    files.forEach((file) => formPayload.append("images", file));

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

      if (!res.ok) throw new Error("Upload thất bại");

      const { urls }: { urls: string[] } = await res.json();

      setFormData((prev) =>
        prev ? { ...prev, images: [...(prev.images ?? []), ...urls] } : prev,
      );

      toast.success(`Đã tải lên ${urls.length} ảnh!`, { id: toastId });
    } catch {
      toast.error("Tải ảnh lên thất bại!", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };
  const onHandleSave = useCallback(
    async (item: CarDetailsType) => {
      if (!item) return;

      const toastId = toast.loading("Đang lưu thông tin...");

      try {
        await changeApi.request<CarDetailsType>(
          "carDetail",
          "update",
          item,
          carDetail?.id,
        );
        toast.success("Cập nhật thông tin thành công!", { id: toastId });
      } catch {
        toast.error("Cập nhật dữ liệu không thành công!", { id: toastId });
      }
    },
    [carDetail],
  );
  if (!formData) {
    return <div>Không có dữ liệu</div>;
  }
  return (
    <div className={cx("form-detail")}>
      <div className={cx("heading")}>
        <h3>Xem chi tiết</h3>
        <div className={cx("close-icon")} onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>

      <div className={cx("form-content")}>
        <div className={cx("form-group")}>
          <label>Mã xe</label>
          <input type="text" name="id" value={formData.id} disabled />
        </div>

        <div className={cx("form-group")}>
          <label>Tên xe</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={cx("form-group")}>
          <label>Thương hiệu</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        <div className={cx("form-group")}>
          <label>Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className={cx("form-group")}>
          <label>Năm sản xuất</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>

        <div className={cx("form-group")}>
          <label>Số km</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
          />
        </div>

        <div className={cx("form-group")}>
          <label>Hộp số</label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
          >
            <option value="Số tự động">Số tự động</option>
            <option value="Số sàn">Số sàn</option>
          </select>
        </div>

        <div className={cx("form-group")}>
          <label>Khu vực</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className={cx("form-group")}>
          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
          />
        </div>

        {/* FEATURES */}
        <div className={cx("form-group")}>
          <label>Tính năng</label>

          <div className={cx("features-list")}>
            {formData.features?.map((feature, index) => (
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
              placeholder="Nhập tính năng mới..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={handleFeatureKeyDown}
            />
            <Button onClick={handleAddFeature}>Thêm</Button>
          </div>
        </div>

        {/* IMAGES */}
        <div className={cx("form-group")}>
          <label>Hình ảnh</label>
          <div className={cx("images-list")}>
            {formData.images?.map((img, index) => (
              <div className={cx("image-item")}>
                <img key={index} src={img} alt="car" />
                <span onClick={() => handleRemoveImage(index)}>
                  <i className="fa-solid fa-x"></i>
                </span>
              </div>
            ))}
            <div
              className={cx("image-add")}
              onClick={() => fileInputRef.current?.click()}
              title="Thêm ảnh"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Thêm ảnh</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleAddImages}
            />
          </div>
        </div>

        {/* SPECS */}
        <div className={cx("form-group")}>
          <label>Thông số kỹ thuật</label>

          {/* Danh sách nhóm */}
          {(formData.specs ?? []).length > 0 ? (
            <>
              {formData.specs!.map((group, groupIndex) => (
                <div key={groupIndex} className={cx("spec-group")}>
                  {/* Header nhóm: input tiêu đề + nút xoá nhóm */}
                  <div className={cx("spec-group-header")}>
                    <input
                      type="text"
                      className={cx("spec-group-title")}
                      value={group.title}
                      placeholder="Tên nhóm (vd: Động cơ, Tiện nghi...)"
                      onChange={(e) =>
                        handleSpecGroupTitleChange(groupIndex, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className={cx("spec-group-remove")}
                      onClick={() => handleRemoveSpecGroup(groupIndex)}
                      title="Xoá nhóm"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>

                  {/* Các dòng thông số */}
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
                      <span className={cx("spec-separator")}>-</span>
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
                        className={cx("spec-remove")}
                        onClick={() =>
                          handleRemoveSpecItem(groupIndex, itemIndex)
                        }
                      >
                        <i className="fa-solid fa-x"></i>
                      </button>
                    </div>
                  ))}

                  <Button onClick={() => handleAddSpecItem(groupIndex)}>
                    + Thêm dòng
                  </Button>
                </div>
              ))}

              {/* Nút thêm nhóm mới — hiện ở dưới khi đã có nhóm */}
              <Button onClick={handleAddSpecGroup}>+ Thêm nhóm thông số</Button>
            </>
          ) : (
            /* Trạng thái rỗng */
            <div className={cx("spec-empty")}>
              <i className="fa-solid fa-table-list"></i>
              <p>Chưa có thông số kỹ thuật</p>
              <Button onClick={handleAddSpecGroup}>+ Thêm nhóm thông số</Button>
            </div>
          )}
        </div>
      </div>

      <div className={cx("footer-act")}>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
          onClick={() => onHandleSave(formData)}
        >
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
};

export default FormDetail;
