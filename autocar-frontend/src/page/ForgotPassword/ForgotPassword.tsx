import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";

import FormAccount from "../../components/FormAccount/FormAccount";
import { Button } from "../../components/Button/Button";

import useForgotPassword from "./hooks/useForgotPassword";
import { config } from "../../config";

const cx = classNames.bind(styles);

const ForgotPassword = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitted, isLoading } =
    useForgotPassword();

  return (
    <div className={cx("forgot-page")}>
      <FormAccount title="Quên mật khẩu">
        <div className={cx("description")}>
          Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.
        </div>

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
              <p className={cx("error")}>{errors.email.message}</p>
            )}
          </div>

          <Button type="submit">
            {isLoading ? "Đang gửi..." : "Gửi liên kết"}
          </Button>
        </form>

        <div className={cx("back-login")}>
          <a href={config.Routes.Login}>
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại đăng nhập
          </a>
        </div>
      </FormAccount>
    </div>
  );
};

export default ForgotPassword;
