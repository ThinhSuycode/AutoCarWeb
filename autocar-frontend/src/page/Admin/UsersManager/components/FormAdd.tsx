import classNames from "classnames/bind";
import styles from "../UsersManager.module.scss";
import { useCallback, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import toast from "react-hot-toast";
import { isValidEmail, isValidPassword } from "../../../../utils/validate";
import { changeApi } from "../../../../services/api";
import type { UserType } from "../../../../types/users";
import { config } from "../../../../config";

const cx = classNames.bind(styles);

interface Props {
  dataAllUser: UserType[];
  onClose: () => void;
}
interface InputTypeForm {
  username: string;
  password: string;
  address: string;
  phone: string;
  email: string;
  role: string;
}
const FormAdd = ({ onClose, dataAllUser }: Props) => {
  const [form, setForm] = useState<InputTypeForm>({
    username: "",
    password: "",
    address: "",
    phone: "",
    email: "",
    role: "user",
  });
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const onHandleActive = useCallback(() => {
    setPasswordShow((prev) => !prev);
  }, []);
  const handleChangeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );
  const onHandleAddUser = useCallback(async () => {
    if (!form.email.trim()) {
      toast.error("Vui lòng nhập email!");
      return;
    }
    if (!isValidEmail(form.email)) {
      toast.error("Email không đúng định dạng!");
      return;
    }
    if (!form.username.trim()) {
      toast.error("Vui lòng nhập tên đăng nhập!");
      return;
    }
    if (!form.address.trim()) {
      toast.error("Vui lòng nhập địa chỉ!");
      return;
    }
    if (!form.password.trim()) {
      toast.error("Vui lòng nhập mật khẩu!");
      return;
    }
    const passwordError = isValidPassword(form.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    const existingEmail = dataAllUser?.some(
      (user) =>
        user.email?.trim().toLowerCase() === form.email.trim().toLowerCase(),
    );
    if (existingEmail) {
      toast.error("Email này đã tồn tại!");
      return;
    }

    const existingPhone = dataAllUser?.some(
      (user) => user.phone?.trim() === form.phone.trim(),
    );
    if (existingPhone) {
      toast.error("Số điện thoại này đã tồn tại!");
      return;
    }

    try {
      await changeApi.request<UserType>("users", "add", form);
      toast.success("Tạo người dùng mới thành công!");
      onClose();
      window.location.href = config.Routes.UsersManager;
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Lỗi khi thêm người dùng";
      toast.error(msg);
    }
  }, [form, dataAllUser, onClose]);

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("heading")}>
        <h3>Tạo tài khoản mới</h3>
        <div className={cx("close-icon")} onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>

      <div className={cx("form-content")}>
        {/* Email */}
        <div className={cx("form-group")}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email ?? ""}
            onChange={handleChangeForm}
          />
        </div>

        {/* Username */}
        <div className={cx("form-group")}>
          <label>Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            value={form.username ?? ""}
            onChange={handleChangeForm}
          />
        </div>

        {/* Phone */}
        <div className={cx("form-group")}>
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={form.phone ?? ""}
            onChange={handleChangeForm}
          />
        </div>

        {/* Address */}
        <div className={cx("form-group")}>
          <label>Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={form.address ?? ""}
            onChange={handleChangeForm}
          />
        </div>

        {/* Role */}
        <div className={cx("form-group")}>
          <label>Vai trò</label>
          <select
            name="role"
            value={form.role ?? "user"}
            onChange={handleChangeForm}
          >
            <option value="user">User</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        {/* Password */}
        <div className={cx("form-group")}>
          <label>Mật khẩu</label>
          <div className={cx("form-input")}>
            <input
              type={passwordShow ? "text" : "password"}
              name="password"
              value={form.password ?? ""}
              onChange={handleChangeForm}
              placeholder="Nhập mật khẩu..."
            />
            <div className={cx("icon")} onClick={onHandleActive}>
              {!passwordShow ? (
                <i className="fa-regular fa-eye"></i>
              ) : (
                <i className="fa-regular fa-eye-slash"></i>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={cx("footer-act")}>
        <Button
          iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
          className={cx("btn-add")}
          onClick={onHandleAddUser}
        >
          Thêm tài khoản
        </Button>
      </div>
    </div>
  );
};

export default FormAdd;
