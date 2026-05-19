import classNames from "classnames/bind";
import styles from "../CarsManager.module.scss";
import type { CarType, ColorType } from "../../../../types/car";
import { changeApi } from "../../../../services/api";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { brands, colors } from "../../../../data/carsData";
import { Button } from "../../../../components/Button/Button";

const cx = classNames.bind(styles);

const FormCar = ({
  onClose,
  onPageChange,
}: {
  onClose: () => void;
  onPageChange: (page: number) => void;
}) => {
  const [form, setForm] = useState<CarType>({
    id: "",
    name: "",
    brand: "",
    price: 0,
    year: 2024,
    mileage: 0,
    transmission: "Số tự động",
    image: "",
    color: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "year" || name === "mileage"
          ? Number(value)
          : value,
    }));
  };
  const handleSubmit = useCallback(async () => {
    try {
      // Validate từng field
      if (!form.id.trim()) {
        toast.error("Vui lòng nhập mã xe!");
        return;
      }
      if (!form.name.trim()) {
        toast.error("Vui lòng nhập tên xe!");
        return;
      }
      if (!form.brand) {
        toast.error("Vui lòng chọn hãng xe!");
        return;
      }
      if (!form.price || form.price <= 0) {
        toast.error("Vui lòng nhập giá xe hợp lệ!");
        return;
      }
      if (
        !form.year ||
        form.year < 1900 ||
        form.year > new Date().getFullYear()
      ) {
        toast.error(
          `Năm sản xuất phải từ 1900 đến ${new Date().getFullYear()}!`,
        );
        return;
      }
      if (form.mileage < 0) {
        toast.error("Số km không được âm!");
        return;
      }
      if (!form.color) {
        toast.error("Vui lòng chọn màu xe!");
        return;
      }
      if (!form.image.trim()) {
        toast.error("Vui lòng nhập link ảnh!");
        return;
      }

      const carNew: CarType = {
        id: form.id,
        name: form.name,
        brand: form.brand,
        price: form.price,
        transmission: form.transmission,
        year: form.year,
        mileage: form.mileage,
        image: form.image,
        color: form.color,
      };
      await changeApi.request<CarType>("cars", "add", carNew);
      toast.success("Thêm xe thành công!");
      onPageChange(1);
      onClose();
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Thêm xe thất bại!";
      toast.error(msg);
    }
  }, [form]);

  return (
    <div className={cx("form-car")}>
      <div className={cx("heading")}>
        <h3>Thêm xe mới</h3>
        <div className={cx("close-icon")} onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>

      {/* ID */}
      <div className={cx("form-content")}>
        <div className={cx("form-group")}>
          <label>Mã xe</label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="VD: suv-002"
          />
        </div>

        {/* NAME */}
        <div className={cx("form-group")}>
          <label>Tên xe</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        {/* BRAND */}
        <div className={cx("form-group")}>
          <label>Hãng xe</label>

          <select name="brand" value={form.brand} onChange={handleChange}>
            <option value="">Chọn hãng</option>

            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE */}
        <div className={cx("form-group")}>
          <label>Giá</label>
          <input
            type="number"
            name="price"
            value={form.price === 0 ? "" : form.price}
            onChange={handleChange}
            placeholder="Vui lòng nhập giá trị VNĐ"
          />
        </div>

        {/* YEAR */}
        <div className={cx("form-group")}>
          <label>Năm sản xuất</label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
          />
        </div>

        {/* MILEAGE */}
        <div className={cx("form-group")}>
          <label>Số km đã đi</label>
          <input
            type="number"
            name="mileage"
            value={form.mileage === 0 ? "" : form.mileage}
            onChange={handleChange}
          />
        </div>

        {/* TRANSMISSION */}
        <div className={cx("form-group")}>
          <label>Hộp số</label>

          <select
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
          >
            <option value="Số tự động">Số tự động</option>

            <option value="Số sàn">Số sàn</option>
          </select>
        </div>

        {/* COLOR */}
        <div className={cx("form-group")}>
          <label>Màu xe</label>
          <select name="color" value={form.color} onChange={handleChange}>
            <option value="">Chọn màu</option>
            {colors.map((cl: ColorType) => (
              <option value={cl.key} key={cl.key}>
                {cl.title}
              </option>
            ))}
          </select>
        </div>
        {/* IMAGE */}
        <div className={cx("form-group")}>
          <label>Link ảnh</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className={cx("form-actions")}>
        <Button onClick={onClose}>Huỷ</Button>

        <Button
          iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
          primary
          onClick={handleSubmit}
        >
          Lưu thông tin xe
        </Button>
      </div>
    </div>
  );
};

export default FormCar;
