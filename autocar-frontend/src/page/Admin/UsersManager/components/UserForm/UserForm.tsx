import classNames from "classnames/bind";
import styles from "../Form.module.scss";
import { Button } from "../../../../../components/Button/Button";
import type { UserType } from "../../../../../types/users";
import { useUserForm } from "./hooks/useUserForm";

const cx = classNames.bind(styles);

interface Props {
  dataAllUser: UserType[];
  onClose: () => void;
}

const UserForm = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    errors,
    passwordShow,
    onHandleActive,
    isCreating,
  } = useUserForm({ onClose });

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("heading")}>
        <h3>Tạo tài khoản mới</h3>
        <div className={cx("close-icon")} onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={cx("form-content")}>
          <div className={cx("form-group")}>
            <label>Email</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <span className={cx("error")}>{errors.email.message}</span>
            )}
          </div>

          {/* Username */}
          <div className={cx("form-group")}>
            <label>Tên đăng nhập</label>
            <input type="text" {...register("username")} />
            {errors.username && (
              <span className={cx("error")}>{errors.username.message}</span>
            )}
          </div>

          {/* Phone */}
          <div className={cx("form-group")}>
            <label>Số điện thoại</label>
            <input type="text" {...register("phone")} />
            {errors.phone && (
              <span className={cx("error")}>{errors.phone.message}</span>
            )}
          </div>

          {/* Address */}
          <div className={cx("form-group")}>
            <label>Địa chỉ</label>
            <input type="text" {...register("address")} />
            {errors.address && (
              <span className={cx("error")}>{errors.address.message}</span>
            )}
          </div>

          {/* Role */}
          <div className={cx("form-group")}>
            <label>Vai trò</label>
            <select {...register("role")}>
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
                {...register("password")}
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
            {errors.password && (
              <span className={cx("error")}>{errors.password.message}</span>
            )}
          </div>
        </div>
        <div className={cx("footer-act")}>
          <Button
            type="submit"
            iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
            className={cx("btn-add")}
          >
            {isCreating ? "Đang tạo..." : "Thêm tài khoản"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
