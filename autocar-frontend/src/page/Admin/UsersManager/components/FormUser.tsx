import classNames from "classnames/bind";
import styles from "../UsersManager.module.scss";
import type { UserType } from "../../../../types/users";
import { Button } from "../../../../components/Button/Button";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { changeApi } from "../../../../services/api";
import { config } from "../../../../config";
import { updateAvatarApi } from "../../../../services/auth.service";

const cx = classNames.bind(styles);

interface Props {
  data: UserType | null;
  onClose: () => void;
  deleteAccount: () => void;
}

interface InputFormProps {
  phone: string;
  username: string;
  password: string;
  avatar: string;
  address: string;
  role: string;
}

const FormUser = ({ data, onClose, deleteAccount }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const DEFAULT_AVATAR =
    "https://www.pngall.com/wp-content/uploads/15/User-PNG-Photos.png";

  const [formInput, setFormInput] = useState<InputFormProps>({
    username: data?.username || "",
    password: "",
    avatar: data?.avatar || "",
    role: data?.role || "user",
    address: data?.address || "",
    phone: data?.phone || "",
  });

  const handleChangeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormInput((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleAvatarUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận ảnh JPG, PNG, WEBP!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ảnh không được vượt quá 2MB!");
        return;
      }

      // Chỉ preview, lưu file vào state chờ
      setPendingAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormInput((prev) => ({
          ...prev,
          avatar: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleRemoveAvatar = useCallback(() => {
    setFormInput((prev) => ({ ...prev, avatar: "" }));
    setPendingAvatarFile(null);
    setAvatarRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);
  const onHandleSave = useCallback(async () => {
    if (
      formInput.password.trim().length >= 1 &&
      formInput.password.trim().length < 8
    ) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự!!");
      return;
    }

    const hasChanges =
      formInput.username !== data?.username ||
      formInput.address !== data?.address ||
      formInput.phone !== data?.phone ||
      formInput.role !== data?.role ||
      formInput.password.trim().length >= 8 ||
      pendingAvatarFile !== null ||
      avatarRemoved;

    if (!hasChanges) {
      toast("Không có thay đổi nào để lưu.", { icon: "ℹ️" });
      return;
    }

    setIsUploading(true);
    try {
      if (pendingAvatarFile && data?._id) {
        const newAvatarUrl = await updateAvatarApi(data._id, pendingAvatarFile);
        setFormInput((prev) => ({
          ...prev,
          avatar: newAvatarUrl || DEFAULT_AVATAR,
        }));
        setPendingAvatarFile(null);
      } else if (avatarRemoved && data?._id) {
        await changeApi.request<UserType>(
          "users",
          "update",
          { avatar: DEFAULT_AVATAR },
          data._id,
        );
        setAvatarRemoved(false);
      }

      const payload: Partial<InputFormProps> = {
        username: formInput.username,
        address: formInput.address,
        phone: formInput.phone,
        role: formInput.role,
        ...(formInput.password.trim().length >= 8 && {
          password: formInput.password.trim(),
        }),
      };

      await changeApi.request<UserType>("users", "update", payload, data?._id);
      toast.success("Cập nhật dữ liệu thành công");
      setTimeout(() => {
        onClose();
        window.location.href = config.Routes.UsersManager;
      }, 350);
    } catch {
      toast.error("Lỗi khi cập nhật dữ liệu!!");
    } finally {
      setIsUploading(false);
    }
  }, [formInput, data, onClose, pendingAvatarFile, avatarRemoved]);
  if (!data) return null;

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("heading")}>
        <h3>Chi tiết tài khoản</h3>
        <div className={cx("close-icon")} onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>

      <div className={cx("form-content")}>
        {/* ID */}
        <div className={cx("form-group")}>
          <label>Mã người dùng</label>
          <input type="text" name="_id" value={data._id ?? ""} disabled />
        </div>

        {/* Username */}
        <div className={cx("form-group")}>
          <label>Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            value={formInput.username ?? ""}
            onChange={handleChangeForm}
          />
        </div>

        {/* Email */}
        <div className={cx("form-group")}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={data.email ?? ""}
            disabled
            style={{ opacity: 0.85, pointerEvents: "none" }}
          />
        </div>

        {/* Phone */}
        <div className={cx("form-group")}>
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formInput.phone ?? ""}
            onChange={handleChangeForm}
          />
        </div>

        {/* Address */}
        <div className={cx("form-group")}>
          <label>Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formInput.address ?? ""}
            onChange={handleChangeForm}
          />
        </div>

        {/* Role */}
        <div className={cx("form-group")}>
          <label>Vai trò</label>
          <select
            name="role"
            value={formInput.role ?? "user"}
            onChange={handleChangeForm}
          >
            <option value="user">User</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        {/* Password */}
        <div className={cx("form-group")}>
          <label>Mật khẩu mới</label>
          <input
            type="password"
            name="password"
            value={formInput.password ?? ""}
            onChange={handleChangeForm}
            placeholder="Để trống nếu không đổi mật khẩu"
          />
        </div>

        {/* Login Type */}
        <div className={cx("form-group")}>
          <label>Kiểu đăng nhập</label>
          <input
            type="text"
            name="loginType"
            style={{ opacity: 0.85, pointerEvents: "none" }}
            value={data.loginType ?? ""}
            disabled
          />
        </div>

        <div className={cx("form-group")}>
          <label>Ảnh đại diện</label>
          <div className={cx("images-list")}>
            {formInput.avatar && (
              <div className={cx("image-item")}>
                <img src={formInput.avatar} alt="avatar" />
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
          <Button onClick={deleteAccount}>Xoá tài khoản</Button>
        </div>
        <div className={cx("right")}>
          <Button onClick={onClose}>Huỷ</Button>
          <Button
            iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
            onClick={onHandleSave}
          >
            Lưu thông tin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormUser;
