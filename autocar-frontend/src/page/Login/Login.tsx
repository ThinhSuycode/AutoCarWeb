import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import FormAccount from "../../components/FormAccount/FormAccount";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { loginApi, loginWithGoogleApi } from "../../services/auth.service";
import { config } from "../../config";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const cx = classNames.bind(styles);

interface InputLoginType {
  email: string;
  password: string;
  remember: boolean;
}

const INITIAL_STATE: InputLoginType = {
  email: "",
  password: "",
  remember: false,
};

const Login = () => {
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState<InputLoginType>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const onHandlePasswordActive = useCallback(() => {
    setPasswordShow((prev) => !prev);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputLogin((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onHandleLogin = useCallback(async () => {
    if (!inputLogin.email.trim() || !inputLogin.password.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin!!");
      return;
    }
    setLoading(true);
    try {
      const res = await loginApi(inputLogin.email, inputLogin.password);
      toast.success("Đăng nhập thành công!!");
      localStorage.setItem("token", res.token);

      window.dispatchEvent(new Event("accountChanged"));
      navigate(config.Routes.Home);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Tài khoản hoặc mật khẩu không đúng",
      );
    } finally {
      setLoading(false);
    }
  }, [inputLogin, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") onHandleLogin();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onHandleLogin]);
  const onHandleGoogleLogin = useCallback(
    async (credentialResponse: any) => {
      try {
        const credential = credentialResponse?.credential;
        if (!credential) {
          toast.error("Đăng nhập Google thất bại!");
          return;
        }

        const res = await loginWithGoogleApi(credential);
        localStorage.setItem("token", res.token);
        toast.success("Đăng nhập Google thành công!!");
        window.dispatchEvent(new Event("accountChanged"));
        navigate(config.Routes.Home);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message || "Đăng nhập Google thất bại!",
        );
      }
    },
    [navigate],
  );
  const passwordShowLength = inputLogin.password.trim().length > 0;
  return (
    <div className={cx("login-page")}>
      <FormAccount title="Đăng nhập">
        <div className={cx("input-form")}>
          <p>Email</p>
          <div className={cx("form")}>
            <div className={cx("icon-left")}>
              <i className="fa-regular fa-envelope"></i>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={inputLogin.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={cx("input-form")}>
          <p>Mật khẩu</p>
          <div className={cx("form")}>
            <div className={cx("icon-left")}>
              <i className="fa-solid fa-lock"></i>
            </div>
            <input
              type={passwordShow ? "text" : "password"}
              name="password"
              placeholder="Nhập mật khẩu"
              value={inputLogin.password}
              onChange={handleInputChange}
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
        </div>

        <div className={cx("form-options")}>
          <div className={cx("left")}>
            <input
              type="checkbox"
              id="checkbox"
              name="remember"
              checked={inputLogin.remember}
              onChange={handleInputChange}
            />
            <label htmlFor="checkbox">Ghi nhớ đăng nhập</label>
          </div>
          <div className={cx("right")}>
            <a>Quên mật khẩu?</a>
          </div>
        </div>

        <Button onClick={onHandleLogin}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>

        <p className={cx("divider")}>Hoặc</p>

        <GoogleLogin
          onSuccess={onHandleGoogleLogin}
          onError={() => toast.error("Đăng nhập Google thất bại!")}
          shape="rectangular"
          theme="outline"
          text="signin_with"
        />
      </FormAccount>
    </div>
  );
};

export default Login;
