import classNames from "classnames/bind";
import styles from "../Form.module.scss";
import { Button } from "../../../../../components/Button/Button";
import { useUserDetailForm } from "./hooks/useUserDetailForm";
import type { UserType } from "../../../../../types/user/user.type";

const cx = classNames.bind(styles);

interface Props {
  data: UserType | null;
  onCloseForm: () => void;
  deleteAccount: () => void;
}

const UserDetailForm = ({ data, onCloseForm, deleteAccount }: Props) => {
  const {
    register,
    handleSubmit,
    errors,
    fileInputRef,
    isUploading,
    avatarPreview,
    handleAvatarUpload,
    handleRemoveAvatar,
  } = useUserDetailForm({ data, onCloseForm });

  if (!data) return null;

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("heading")}>
        <h3>Chi tiết tài khoản</h3>
        <div className={cx("close-icon")} onClick={onCloseForm}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ID */}
        <div className={cx("form-content")}>
          <div className={cx("form-group")}>
            <label>Mã người dùng</label>
            <input type="text" value={data._id ?? ""} disabled />
          </div>

          {/* Username */}
          <div className={cx("form-group")}>
            <label>Tên đăng nhập</label>
            <input type="text" {...register("username")} />
            {errors.username && (
              <span className={cx("error-text")}>
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className={cx("form-group")}>
            <label>Email</label>
            <input
              type="email"
              value={data.email ?? ""}
              disabled
              style={{ opacity: 0.85, pointerEvents: "none" }}
            />
          </div>

          {/* Phone */}
          <div className={cx("form-group")}>
            <label>Số điện thoại</label>
            <input type="text" {...register("phone")} />
            {errors.phone && (
              <span className={cx("error-text")}>{errors.phone.message}</span>
            )}
          </div>

          {/* Address */}
          <div className={cx("form-group")}>
            <label>Địa chỉ</label>
            <input type="text" {...register("address")} />
            {errors.address && (
              <span className={cx("error-text")}>{errors.address.message}</span>
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
            <label>Mật khẩu mới</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Để trống nếu không đổi mật khẩu"
            />
            {errors.password && (
              <span className={cx("error-text")}>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Login Type */}
          <div className={cx("form-group")}>
            <label>Kiểu đăng nhập</label>
            <input
              type="text"
              style={{ opacity: 0.85, pointerEvents: "none" }}
              value={data.loginType ?? ""}
              disabled
            />
          </div>

          {/* Avatar */}
          <div className={cx("form-group")}>
            <label>Ảnh đại diện</label>
            <div className={cx("images-list")}>
              {avatarPreview && (
                <div className={cx("image-item")}>
                  <img src={avatarPreview} alt="avatar" />
                  <span onClick={handleRemoveAvatar}>
                    <i className="fa-solid fa-x"></i>
                  </span>
                </div>
              )}
              <div
                className={cx("image-add")}
                onClick={() => fileInputRef.current?.click()}
                title="Tải ảnh lên"
              >
                <i className="fa-solid fa-plus"></i>
                <span>{isUploading ? "Đang tải..." : "Chọn ảnh"}</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarUpload}
              />
            </div>
          </div>
        </div>
        <div className={cx("footer-act")}>
          <div className={cx("left")}>
            <Button type="button" onClick={deleteAccount}>
              Xoá tài khoản
            </Button>
          </div>
          <div className={cx("right")}>
            <Button type="button" onClick={onCloseForm}>
              Huỷ
            </Button>
            <Button
              type="submit"
              iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
            >
              {isUploading ? "Đang lưu..." : "Lưu thông tin"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetailForm;
