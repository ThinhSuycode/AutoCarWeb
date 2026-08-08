import classNames from "classnames/bind";
import styles from "./FormChangePassword.module.scss";

import { fields } from "./constants/fields";
import useChangePassword from "./hooks/useChangePassword";

const cx = classNames.bind(styles);

interface FormChangePasswordProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const FormChangePassword = ({
  onClose,
  onSuccess,
}: FormChangePasswordProps) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showPass,
    toggleShowPass,
    onSubmit,
  } = useChangePassword({
    onSuccess,
  });

  return (
    <form className={cx("form-inner")} onSubmit={handleSubmit(onSubmit)}>
      <div className={cx("heading")}>
        <h2 className={cx("form-title")}>Đổi mật khẩu</h2>

        <div className={cx("icon-close")} onClick={onClose}>
          <i className="fa-solid fa-x" />
        </div>
      </div>

      {fields.map(({ label, name, placeholder }) => (
        <div key={name} className={cx("form-input")}>
          <label>{label}</label>

          <div className={cx("input-wrapper")}>
            <input
              type={showPass[name] ? "text" : "password"}
              placeholder={placeholder}
              {...register(name)}
            />

            <span
              className={cx("icon-eye")}
              onClick={() => toggleShowPass(name)}
            >
              <i
                className={`fa-regular ${
                  showPass[name] ? "fa-eye" : "fa-eye-slash"
                }`}
              />
            </span>
          </div>

          {errors[name] && (
            <p className={cx("error")}>{errors[name]?.message}</p>
          )}
        </div>
      ))}

      <div className={cx("form-btn")}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
        </button>
      </div>
    </form>
  );
};

export default FormChangePassword;
