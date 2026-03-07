import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import FormAccount from "../../components/FormAccount/FormAccount";
import Button from "../../components/Button/Button";
import gg from "../../assets/img/gg.png";
import { useCallback, useEffect, useState } from "react";
import { callApi } from "../../services/api";

import { useNavigate } from "react-router-dom";
import type { CustomerType } from "../../types/customer";

const cx = classNames.bind(styles);

export interface InputLoginType {
  email: string;
  password: string;
  remember?: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerType[]>([]);
  const [inputLogin, setInputLogin] = useState<InputLoginType>({
    email: "",
    password: "",
    remember: false,
  });
  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await callApi.getData("customer");
      setCustomer(data);
    };
    fetchCustomer();
  }, []);

  const onHandleLogin = useCallback(() => {
    if (!customer) return;
    if (!inputLogin.email.trim()) {
      alert("Vui lòng nhập Email!!");
      return;
    }
    if (!inputLogin.password.trim()) {
      alert("Vui lòng nhập Password!!");
      return;
    }
    const existAccount = customer.find(
      (cus: CustomerType) =>
        cus.email === inputLogin.email && cus.password === inputLogin.password,
    );
    if (existAccount) {
      alert("Đăng nhập thành công !!");
      localStorage.setItem("accountActive", JSON.stringify(inputLogin.email));
      window.dispatchEvent(new Event("accountChanged"));
      navigate("/");
    } else {
      alert("Tài khoản hoặc mật khẩu không hợp lệ. Vui lòng thử lại !!");
      return;
    }
  }, [customer, inputLogin]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className={cx("login-page")}>
      <FormAccount title="Đăng nhập">
        <div className={cx("input-form")}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Nhập email của bạn"
            value={inputLogin.email || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className={cx("input-form")}>
          <p>Mật khẩu</p>
          <input
            type="password"
            name="password"
            id="password"
            value={inputLogin.password || ""}
            placeholder="Nhập mật khẩu"
            onChange={handleInputChange}
          />
        </div>

        <div className={cx("form-options")}>
          <div className={cx("left")}>
            <input
              type="checkbox"
              id="checkbox"
              name="remember"
              onChange={handleInputChange}
            />
            <label htmlFor="checkbox">Ghi nhớ đăng nhập</label>
          </div>
          <div className={cx("right")}>
            <p>Quên mật khẩu?</p>
          </div>
        </div>

        <Button onClick={onHandleLogin}>Đăng nhập</Button>

        <p className={cx("divider")}>Hoặc</p>

        <div className={cx("gg-action")}>
          <div className={cx("left")}>
            <img src={gg} alt="" />
          </div>
          <div className={cx("right")}>Đăng nhập với Google</div>
        </div>
      </FormAccount>
    </div>
  );
};

export default Login;
