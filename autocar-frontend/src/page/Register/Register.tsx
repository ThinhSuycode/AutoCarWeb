import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import FormAccount from "../../components/FormAccount/FormAccount";
import { config } from "../../config";
import { Button } from "../../components/Button/Button";
import useRegister from "./hooks/useRegister";

const cx = classNames.bind(styles);
const Register = () => {
  const {
    register,
    onSubmit,
    handleSubmit,
    errors,
    isSubmitted,
    passwordLength,
    showConfirmPassword,
    showPassword,
    confirmPasswordLength,
    setShowConfirmPassword,
    setShowPassword,
  } = useRegister();
  return (
    <div className={cx("register-page")}>
      <FormAccount title={"Đăng ký"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cx("input-form")}>
            <p>Email</p>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              {...register("email")}
            />
            {isSubmitted && errors.email && (
              <p className={cx("error")}>{errors.email.message}</p>
            )}
          </div>

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

          <div className={cx("input-form")}>
            <p>Username</p>
            <input
              type="text"
              placeholder="Nhập tên hiển thị"
              {...register("username")}
            />
            {isSubmitted && errors.username && (
              <p className={cx("error")}>{errors.username.message}</p>
            )}
          </div>

          <div className={cx("input-form")}>
            <p>Số điện thoại</p>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              {...register("phone")}
            />
            {isSubmitted && errors.phone && (
              <p className={cx("error")}>{errors.phone.message}</p>
            )}
          </div>

          <Button type="submit" className={cx("btn-register")}>
            Đăng ký
          </Button>

          <div className={cx("account-login")}>
            <a href={config.Routes.Login}>Đã có tài khoản đăng nhập</a>
          </div>
        </form>
      </FormAccount>
    </div>
  );
};

export default Register;
