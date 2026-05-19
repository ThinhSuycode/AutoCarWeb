import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import FormAccount from "../../components/FormAccount/FormAccount";
import { config } from "../../config";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { registerApi } from "../../services/auth.service";
import type { UserType } from "../../types/users";
import { callApi } from "../../services/api";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

interface InputRegisterType {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  phone: string;
}
interface PasswordShowProps {
  lable: "password1" | "password2" | "";
  status: boolean;
}
const Register = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await callApi.getData<UserType[]>("users");
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  const [inputRegister, setInputRegister] = useState<InputRegisterType>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
  });

  const onChangeInputRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Thay PasswordShowProps và state cũ bằng 2 state đơn giản
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const password1ShowLength = inputRegister.password.trim().length > 0;
  const password2ShowLength = inputRegister.confirmPassword.trim().length > 0;

  const onHandleRegister = useCallback(async () => {
    const { email, password, confirmPassword, username, phone } = inputRegister;

    if (!email || !password || !confirmPassword || !username || !phone) {
      return toast.error("Vui lòng nhập đầy đủ thông tin!");
    }

    if (password !== confirmPassword) {
      return toast.error("Mật khẩu không khớp!");
    }

    try {
      const res = await registerApi({
        email,
        password,
        username,
        phone,
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      toast.success("Đăng ký thành công!");
      navigate(config.Routes.Login);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đăng ký thất bại");
      // toast.error("null");
    }
  }, [inputRegister, navigate, users]);

  useEffect(() => {
    const onSubmitKeyDown = (e: KeyboardEvent) => {
      const target = e.key;
      if (target === "Enter") onHandleRegister();
    };
    window.addEventListener("keydown", onSubmitKeyDown);
    return () => window.removeEventListener("keydown", onSubmitKeyDown);
  }, [onHandleRegister]);

  return (
    <div className={cx("register-page")}>
      <FormAccount title={"Đăng ký"}>
        <div className={cx("input-form")}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={inputRegister.email}
            onChange={onChangeInputRegister}
          />
        </div>

        <div className={cx("input-form")}>
          <p>Mật khẩu</p>
          <div className={cx("form")}>
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              placeholder="Nhập mật khẩu"
              value={inputRegister.password}
              onChange={onChangeInputRegister}
            />
            {password1ShowLength && (
              <div
                className={cx("icon-right")}
                onClick={() => setShowPassword1((p) => !p)}
              >
                {showPassword1 ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={cx("input-form")}>
          <p>Nhập lại mật khẩu</p>
          <div className={cx("form")}>
            <input
              type={showPassword2 ? "text" : "password"}
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={inputRegister.confirmPassword}
              onChange={onChangeInputRegister}
            />
            {password2ShowLength && (
              <div
                className={cx("icon-right")}
                onClick={() => setShowPassword2((p) => !p)}
              >
                {showPassword2 ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={cx("input-form")}>
          <p>Username</p>
          <input
            type="text"
            name="username"
            placeholder="Nhập tên hiển thị"
            value={inputRegister.username}
            onChange={onChangeInputRegister}
          />
        </div>

        <div className={cx("input-form")}>
          <p>Số điện thoại</p>
          <input
            type="text"
            name="phone"
            placeholder="Nhập số điện thoại"
            value={inputRegister.phone}
            onChange={onChangeInputRegister}
          />
        </div>

        <Button onClick={onHandleRegister}>Đăng ký</Button>

        <div className={cx("account-login")}>
          <a href={config.Routes.Login}>Đã có tài khoản đăng nhập</a>
        </div>
      </FormAccount>
    </div>
  );
};

export default Register;
