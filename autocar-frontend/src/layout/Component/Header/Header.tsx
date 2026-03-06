import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import logo from "../../../assets/icon/logoCar.png";
import Button from "../../../components/Button/Button";
import {
  dataHeaderNav,
  MenuCustomerData,
} from "../../../services/data/HeaderData";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { config } from "../../../config";
import { callApi } from "../../../services/api";
import Menu from "../../../components/Menu/Menu";
import type { CustomerType } from "../../../types/customer";
import type { HeaderNavType } from "../../../types/menu";
const cx = classNames.bind(styles);

const Header = () => {
  const [customerActive] = useState<string>(() => {
    try {
      const data = localStorage.getItem("accountActive");
      return data ? JSON.parse(data) : "";
    } catch {
      return "";
    }
  });
  const [infoCustomer, setInfoCustomer] = useState<CustomerType>();
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const refOutside = useRef<HTMLDivElement | null>(null);

  const isLogin = customerActive.length > 0;

  const onHandleAccount = useCallback(() => {
    window.location.href = config.Routes.Login;
  }, []);
  useEffect(() => {
    const fetchCustomerActive = async () => {
      const data = await callApi.getData("customer");
      if (data && Array.isArray(data)) {
        const findCustomerData = data.find(
          (cus: CustomerType) => cus.email === customerActive,
        );
        setInfoCustomer(findCustomerData);
      } else {
        return;
      }
    };
    fetchCustomerActive();
  }, [customerActive]);
  const onHandleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuActive((prev) => !prev);
  }, []);
  const onHandleOverlayMenu = useCallback((e: MouseEvent) => {
    const modals = refOutside.current;
    if (modals && !modals.contains(e.target as Node)) {
      setMenuActive(false);
    }
  }, []);
  useEffect(() => {
    if (!menuActive) return;
    document.addEventListener("click", onHandleOverlayMenu);
    return () => {
      document.removeEventListener("click", onHandleOverlayMenu);
    };
  }, [onHandleOverlayMenu, menuActive]);

  return (
    <div className={cx("header-inner")}>
      <div className={cx("header-left")}>
        <img src={logo} alt="nologo" />
        <div className={cx("info-logo")}>
          <p className={cx("title")}>AUTOVIET</p>
          <p className={cx("desc")}>Uy tín - Chất lượng</p>
        </div>
      </div>
      <div className={cx("header-mid")}>
        <div className={cx("list-nav")}>
          {dataHeaderNav.map((item: HeaderNavType, idx: number) => (
            <a href={item.href} className={cx("nav-item")} key={idx}>
              {item.title}
            </a>
          ))}
        </div>
      </div>
      <div className={cx("header-right")}>
        <Button outline medium iconLeft={<i className="fa-solid fa-phone"></i>}>
          0869114177
        </Button>
        {isLogin ? (
          <div className={cx("customer-avatar")} onClick={onHandleMenu}>
            <img src={infoCustomer?.avatar} alt="" />
          </div>
        ) : (
          <Button medium onClick={onHandleAccount}>
            Liên hệ ngay
          </Button>
        )}
      </div>
      <div
        className={cx("menu-wrapper", { slideDown: menuActive })}
        ref={refOutside}
      >
        <Menu items={MenuCustomerData}></Menu>
      </div>
    </div>
  );
};

export default Header;
