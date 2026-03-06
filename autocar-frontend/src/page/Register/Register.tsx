import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import FormAccount from "../../components/FormAccount/FormAccount";
import Button from "../../components/Button/Button";
import { config } from "../../config";
import { useCallback, useEffect, useState } from "react";
import type { CustomerType } from "../../services/data/customer";
import type { InputLoginType } from "../Login/Login";
import { callApi, changeApi } from "../../services/api";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
interface InputRegisterType extends InputLoginType {
  confirmPassword: string;
  username: string;
  phone: string;
}
const Register = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerType[]>([]);
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
  useEffect(() => {
    const fetchCustomerData = async () => {
      const data = await callApi.getData("customer");
      setCustomer(data);
    };
    fetchCustomerData();
  }, []);

  const onHandleRegister = useCallback(async () => {
    if (!inputRegister.email.trim()) {
      alert("Vui lòng nhập email !!");
      return;
    }
    if (!inputRegister.password.trim()) {
      alert("Vui lòng nhập mật khẩu !!");
      return;
    }
    if (!inputRegister.confirmPassword.trim()) {
      alert("Vui lòng nhập lại mật khẩu !!");
      return;
    }
    if (!inputRegister.phone.trim()) {
      alert("Vui lòng nhập số điện thoại !!");
      return;
    }
    if (!inputRegister.username.trim()) {
      alert("Vui lòng nhập tên hiển thị !!");
      return;
    }
    if (inputRegister.password !== inputRegister.confirmPassword) {
      alert("Mật khẩu xác minh không đúng vui lòng thử lại !!");
      return;
    }
    const existRegister = customer.find(
      (cus: CustomerType) => cus.email === inputRegister.email,
    );
    const idMax =
      customer.length > 0
        ? Math.max(...customer.map((cus) => Number(cus.id || 0)))
        : 0;

    const customerNew: CustomerType = {
      id: String(idMax + 1),
      email: inputRegister.email,
      password: inputRegister.password,
      phone: inputRegister.phone,
      username: inputRegister.username,
      avatar:
        "https://www.pngall.com/wp-content/uploads/15/User-PNG-Photos.png",
      address: "",
    };
    if (existRegister) {
      alert("Tài khoản email đã tồn tại. Vui lòng thay đổi email khác !!");
      return;
    } else {
      const result = await changeApi.getData("customer", "add", customerNew);
      if (result) {
        alert("Đăng ký thành công tài khoản !!");
        navigate(config.Routes.Home);
      } else {
        alert("Đăng ký thất bại. Vui lòng thử lại !!");
      }
    }
  }, [inputRegister, customer]);
  return (
    <div className={cx("register-page")}>
      <FormAccount title={"Đăng ký"}>
        <div className={cx("input-form")}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Nhập email của bạn"
            value={inputRegister.email || ""}
            onChange={onChangeInputRegister}
          />
        </div>

        <div className={cx("input-form")}>
          <p>Mật khẩu</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Nhập mật khẩu"
            value={inputRegister.password || ""}
            onChange={onChangeInputRegister}
          />
        </div>
        <div className={cx("input-form")}>
          <p>Nhập Lại Mật khẩu</p>
          <input
            type="password"
            name="confirmPassword"
            id="password"
            placeholder="Nhập lại mật khẩu"
            value={inputRegister.confirmPassword || ""}
            onChange={onChangeInputRegister}
          />
        </div>
        <div className={cx("input-form")}>
          <p>Username</p>
          <input
            type="text"
            name="username"
            placeholder="Nhập tên hiển thị"
            value={inputRegister.username || ""}
            onChange={onChangeInputRegister}
          />
        </div>
        <div className={cx("input-form")}>
          <p>Số điện thoại</p>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Nhập số điện thoại"
            value={inputRegister.phone || ""}
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
