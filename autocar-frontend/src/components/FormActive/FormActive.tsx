import classNames from "classnames/bind";
import styles from "./FormActive.module.scss";
import { useCallback, useState } from "react";
import { Button } from "../../components/Button/Button";
import { changePasswordApi } from "../../services/auth.service";

const cx = classNames.bind(styles);

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const INITIAL_FORM: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const fields: {
  label: string;
  name: keyof PasswordForm;
  placeholder: string;
}[] = [
  {
    label: "Mật khẩu hiện tại",
    name: "currentPassword",
    placeholder: "Nhập mật khẩu hiện tại",
  },
  {
    label: "Mật khẩu mới",
    name: "newPassword",
    placeholder: "Nhập mật khẩu mới",
  },
  {
    label: "Xác nhận mật khẩu",
    name: "confirmPassword",
    placeholder: "Nhập lại mật khẩu mới",
  },
];

const validate = (form: PasswordForm): string | null => {
  if (!form.currentPassword.trim()) return "Vui lòng nhập mật khẩu hiện tại";
  if (!form.newPassword.trim()) return "Vui lòng nhập mật khẩu mới";
  if (form.newPassword.length < 6)
    return "Mật khẩu mới phải có ít nhất 6 ký tự";
  if (form.newPassword === form.currentPassword)
    return "Mật khẩu mới không được trùng mật khẩu cũ";
  if (form.newPassword !== form.confirmPassword)
    return "Mật khẩu xác nhận không khớp";
  return null;
};

interface FormActiveProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const FormActive = ({ onClose, onSuccess }: FormActiveProps) => {
  const [form, setForm] = useState<PasswordForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPass, setShowPass] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const onChangeForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setSuccess("");
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const toggleShowPass = useCallback((name: keyof PasswordForm) => {
    setShowPass((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const onHandleChangePassword = useCallback(async () => {
    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await changePasswordApi({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setSuccess("Đổi mật khẩu thành công!");
      setForm(INITIAL_FORM);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  }, [form]);

  return (
    <div className={`${cx("form-inner")}`}>
      <div className={cx("heading")}>
        <h2 className={cx("form-title")}>Đổi mật khẩu</h2>
        <div className={cx("icon-close")} onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>

      {fields.map(({ label, name, placeholder }) => (
        <div className={cx("form-input")} key={name}>
          <label>{label}</label>
          <div className={cx("input-wrapper")}>
            <input
              type={showPass[name] ? "text" : "password"}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={onChangeForm}
            />
            <span
              className={cx("icon-eye")}
              onClick={() => toggleShowPass(name)}
            >
              <i
                className={`fa-regular ${showPass[name] ? "fa-eye" : "fa-eye-slash"}`}
              ></i>
            </span>
          </div>
        </div>
      ))}

      {error && <p className={cx("error-message")}>{error}</p>}
      {success && <p className={cx("success-message")}>{success}</p>}

      <div className={cx("form-btn")}>
        <Button medium onClick={onHandleChangePassword}>
          {loading ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
        </Button>
      </div>
    </div>
  );
};

export default FormActive;
