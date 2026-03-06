import classNames from "classnames/bind";
import styles from "./MenuCustomer.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import type { CustomerType } from "../../services/data/customer";
import { callApi } from "../../services/api";
import { useLocation, NavLink } from "react-router-dom";
import {
  MenuCustomerData,
  type MenuCustomerType,
} from "../../services/data/HeaderData";
import Header from "../Component/Header/Header";

const cx = classNames.bind(styles);
const MenuCustomer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [emailActive] = useState<string>(() => {
    const email = localStorage.getItem("accountActive");
    return email ? JSON.parse(email) : "";
  });
  const [account, setAccount] = useState<CustomerType | null>(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        if (!emailActive) return;
        const data = await callApi.getData("customer");
        if (data && Array.isArray(data)) {
          const filterAccount = data.find(
            (acc: CustomerType) => acc.email === emailActive,
          );
          setAccount(filterAccount);
        }
      } catch (error) {
        console.log("Fetch data fail ", error);
      }
    };
    fetchAccountData();
  }, [emailActive]);
  const onHandleChangeAvatar = useCallback(() => {}, []);
  return (
    <div className={cx("menuCustomer-page")}>
      <Header></Header>
      <div className={cx("menuCustomer-inner")}>
        <div className={cx("menuCustomer-left")}>
          <div className={cx("account-info")} onClick={onHandleChangeAvatar}>
            <div className={cx("avatar-account")}>
              <img src={account?.avatar} alt="avatar" />
              <div className={cx("icon-camera")}>
                <i className="fa-regular fa-camera"></i>
              </div>
            </div>
            <h4 className={cx("fullname")}>{account?.username}</h4>
            <p className={cx("desc")}>Thành viên từ tháng 1, 2026</p>
            <div className={cx("level")}>Khách hàng thân thiết</div>
          </div>
          <div className={cx("tab-navigation")}>
            {MenuCustomerData.map((item: MenuCustomerType, idx: number) => (
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cx("tab-item", { "active-item": isActive })
                }
                key={idx}
              >
                <span>
                  <i className={`${item.icon}`}></i>
                </span>
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className={cx("menuCustomer-content")}>{children}</div>
      </div>
    </div>
  );
};

export default MenuCustomer;
