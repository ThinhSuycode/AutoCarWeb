import classNames from "classnames/bind";
import styles from "./FormAccount.module.scss";
import type { ReactNode } from "react";
import { config } from "../../config";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const FormAccount = ({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cx("formAccount-inner", { className })}>
      <div className={cx("form-general")}>
        <div className={cx("heading")}>
          <div className={cx("title")}>{title}</div>
          <div className={cx("desc")}>
            Chào mừng bạn đã đến với <span>Auto Việt</span>
          </div>
        </div>
        <div className={cx("form-inner")}>{children}</div>
        {title === "Đăng nhập" && (
          <div className={cx("no-account")}>
            Chưa có tài khoản?{" "}
            <Link to={config.Routes.Register}>Đăng ký ngay</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAccount;
