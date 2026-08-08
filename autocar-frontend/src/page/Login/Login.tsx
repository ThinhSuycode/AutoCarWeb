import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import FormAccount from "../../components/FormAccount/FormAccount";
import { Button } from "../../components/Button/Button";

import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

import { useLogin } from "./hooks/useLogin";
import { config } from "../../config";

const cx = classNames.bind(styles);

const Login = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitted,
    handleGoogleLogin,
    passwordShow,
    passwordShowLength,
    onHandlePasswordActive,
    isLoading,
  } = useLogin();

  return (
    <div className={cx("login-page")}>
      <div className={cx("login-wrapper")}>
        <FormAccount title="Đăng nhập">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cx("input-form")}>
              <p>Email</p>
              <div className={cx("form")}>
                <div className={cx("icon-left")}>
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  {...register("email")}
                />
              </div>
              {isSubmitted && errors.email && (
                <span className={cx("error")}>{errors.email.message}</span>
              )}
            </div>

            <div className={cx("input-form")}>
              <p>Mật khẩu</p>
              <div className={cx("form")}>
                <div className={cx("icon-left")}>
                  <i className="fa-solid fa-lock"></i>
                </div>
                <input
                  type={passwordShow ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  {...register("password")}
                />
                {passwordShowLength && (
                  <div
                    className={cx("icon-right")}
                    onClick={onHandlePasswordActive}
                  >
                    {!passwordShow ? (
                      <i className="fa-regular fa-eye"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash"></i>
                    )}
                  </div>
                )}
              </div>
              {isSubmitted && errors.password && (
                <span className={cx("error")}>{errors.password.message}</span>
              )}
            </div>

            <div className={cx("form-options")}>
              <div className={cx("left")}>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Ghi nhớ đăng nhập</label>
              </div>
              <div className={cx("right")}>
                <a href={config.Routes.ForgotPassword}>Quên mật khẩu?</a>
              </div>
            </div>

            <Button type="submit" className={cx("btn-login")}>
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          <div className={cx("divider")}>
            <span>Hoặc</span>
          </div>

          <div className={cx("gg-wrapper")}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Đăng nhập Google thất bại!")}
              shape="rectangular"
              theme="outline"
              text="signin_with"
            />
          </div>
        </FormAccount>
      </div>
    </div>
  );
};

export default Login;
