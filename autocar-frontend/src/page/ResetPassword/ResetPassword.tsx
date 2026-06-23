import classNames from "classnames/bind";

import styles from "./ResetPassword.module.scss";

import FormAccount from "../../components/FormAccount/FormAccount";

import { Button } from "../../components/Button/Button";
import useResetPassword from "./hooks/useResetPassword";

const cx = classNames.bind(styles);

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    showConfirmPassword,
    setShowConfirmPassword,
    setShowPassword,
    passwordLength,
    confirmPasswordLength,
    showPassword,
    errors,
    isSubmitted,

    isLoading,
  } = useResetPassword();

  return (
    <div className={cx("reset-password-page")}>
      <FormAccount title="Đặt lại mật khẩu">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cx("input-form")}>
            <p>Mật khẩu</p>
            <div className={cx("form")}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                {...register("password")}
              />
              {passwordLength && (
                <div
                  className={cx("icon-right")}
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </div>
              )}
            </div>
            {isSubmitted && errors.password && (
              <p className={cx("error")}>{errors.password.message}</p>
            )}
          </div>

          <div className={cx("input-form")}>
            <p>Nhập lại mật khẩu</p>
            <div className={cx("form")}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                {...register("confirmPassword")}
              />
              {confirmPasswordLength && (
                <div
                  className={cx("icon-right")}
                  onClick={() => setShowConfirmPassword((p) => !p)}
                >
                  {showConfirmPassword ? (
                    <i className="fa-regular fa-eye-slash"></i>
                  ) : (
                    <i className="fa-regular fa-eye"></i>
                  )}
                </div>
              )}
            </div>
            {isSubmitted && errors.confirmPassword && (
              <p className={cx("error")}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit">
            {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </Button>
        </form>
      </FormAccount>
    </div>
  );
};

export default ResetPassword;
