import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import logo from "../../../assets/icon/logoCar.png";
import { dataHeaderNav, MenuUserData } from "../../../constants/HeaderData";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { config } from "../../../config";
import Menu from "../../../components/Menu/Menu";
import { Button } from "../../../components/Button/Button";
import { getMeApi } from "../../../services/auth.service";
import type { UserType } from "../../../types/user/user.type";
import type { HeaderNavType } from "../../../types/menu/navigation.type";

const cx = classNames.bind(styles);

const Header = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const refOutside = useRef<HTMLDivElement | null>(null);
  const refNavOutside = useRef<HTMLDivElement | null>(null);
  const [infoUser, setInfoUser] = useState<UserType | null>();

  const isLogin = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isLogin) return;
    const fetchMe = async () => {
      try {
        const data = await getMeApi();
        setInfoUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        setInfoUser(null);
      }
    };
    fetchMe();
  }, [isLogin]);

  const onHandleAccount = useCallback(() => {
    window.location.href = config.Routes.Login;
  }, []);

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

  const onHandleOverlayNav = useCallback((e: MouseEvent) => {
    if (
      refNavOutside.current &&
      !refNavOutside.current.contains(e.target as Node)
    ) {
      setNavOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!menuActive) return;
    document.addEventListener("click", onHandleOverlayMenu);
    return () => document.removeEventListener("click", onHandleOverlayMenu);
  }, [onHandleOverlayMenu, menuActive]);

  useEffect(() => {
    if (!navOpen) return;
    document.addEventListener("click", onHandleOverlayNav);
    return () => document.removeEventListener("click", onHandleOverlayNav);
  }, [onHandleOverlayNav, navOpen]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  return (
    <div className={cx("header-inner")}>
      <div className={cx("header-container")}>
        <a href={config.Routes.Home} className={cx("header-left")}>
          <img src={logo} alt="nologo" />
          <div className={cx("info-logo")}>
            <p className={cx("title")}>AUTOVIET</p>
            <p className={cx("desc")}>Uy tín - Chất lượng</p>
          </div>
        </a>

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
          <Button
            outline
            medium
            iconLeft={<i className="fa-solid fa-phone"></i>}
            href={config.Routes.Contact}
          >
            0869114177
          </Button>
          {isLogin ? (
            <div className={cx("user-avatar")} onClick={onHandleMenu}>
              <img src={infoUser?.avatar} alt="" />
            </div>
          ) : (
            <Button medium onClick={onHandleAccount}>
              Liên hệ ngay
            </Button>
          )}

          <button
            className={cx("toolbar-menu", { active: navOpen })}
            onClick={(e) => {
              e.stopPropagation();
              setNavOpen((prev) => !prev);
            }}
            aria-label="Toggle menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <div
          className={cx("menu-wrapper", { slideDown: menuActive })}
          ref={refOutside}
        >
          <Menu items={MenuUserData} role={infoUser?.role || "user"} />
        </div>
      </div>

      <div
        className={cx("mobile-overlay", { open: navOpen })}
        onClick={() => setNavOpen(false)}
      />

      <div className={cx("mobile-nav", { open: navOpen })} ref={refNavOutside}>
        <div className={cx("mobile-nav-header")}>
          <img src={logo} alt="logo" />
          <div className={cx("info-logo")}>
            <p className={cx("title")}>AUTOVIET</p>
            <p className={cx("desc")}>Uy tín - Chất lượng</p>
          </div>
          <button
            className={cx("mobile-nav-close")}
            onClick={() => setNavOpen(false)}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <nav className={cx("mobile-nav-list")}>
          {dataHeaderNav.map((item: HeaderNavType, idx: number) => (
            <a
              href={item.href}
              className={cx("mobile-nav-item")}
              key={idx}
              onClick={() => setNavOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div className={cx("mobile-nav-footer")}>
          <Button
            outline
            medium
            iconLeft={<i className="fa-solid fa-phone"></i>}
            href={config.Routes.Contact}
          >
            0869114177
          </Button>
          {!isLogin && (
            <Button medium onClick={onHandleAccount}>
              Liên hệ ngay
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
