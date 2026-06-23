import classNames from "classnames/bind";
import styles from "./MenuUser.module.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MenuUserData } from "../../data/HeaderData";
import Header from "../Component/Header/Header";
import type { UserType } from "../../types/users";
import { getMeApi, updateAvatarApi } from "../../services/auth.service";
import type { ManagerItemType, MenuItemType } from "../../types/menu";
import { transformRole } from "../../hooks/transformRole";

const cx = classNames.bind(styles);

const MenuUser: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<UserType | null>(null);
  const [avatarKey, setAvatarKey] = useState<number>(Date.now());
  const locationCurrent = useLocation();
  const isLogin = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isLogin) return;
    const fetchInfoAccount = async () => {
      try {
        const data = await getMeApi();
        setAccount(data);
      } catch {
        localStorage.removeItem("token");
        setAccount(null);
      }
    };
    fetchInfoAccount();
  }, [isLogin]);

  const onHandleChangeAvatar = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      const userId = account?._id;

      if (!file || !userId) return;

      try {
        const updatedUser = await updateAvatarApi(userId, file);
        setAccount(updatedUser);
        setAvatarKey(Date.now());
      } catch (error) {
        console.error("Upload avatar thất bại:", error);
      }
    };
    input.click();
  }, [account]);

  const filteredMenu = useMemo(
    () =>
      MenuUserData.filter((item: MenuItemType) => {
        if (!item.role) return true;
        const role = account?.role;
        if (!role) return false;
        const allowedRoles = Array.isArray(item.role) ? item.role : [item.role];
        return allowedRoles.includes(role as any);
      }),
    [account?.role],
  );

  const roleTitle = account?.role ? transformRole(account.role) : "";
  const role = account?.role;

  return (
    <div className={cx("menuUser-page")}>
      <Header />
      <div className={cx("menuUser-inner")}>
        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <div className={cx("menuUser-left")}>
          <div className={cx("account-info")}>
            <div
              className={cx("avatar-account")}
              onClick={onHandleChangeAvatar}
            >
              <img
                src={
                  account?.avatar
                    ? `${account.avatar}?t=${avatarKey}`
                    : "/default-avatar.png"
                }
                alt="avatar"
              />
              <div className={cx("icon-camera")}>
                <i className="fa-regular fa-camera"></i>
              </div>
            </div>
            <h4 className={cx("fullname")}>{account?.username}</h4>
            <p className={cx("desc")}>Thành viên từ tháng 1, 2026</p>
            <div className={cx("level")}>{roleTitle}</div>
          </div>

          <div className={cx("tab-navigation")}>
            {filteredMenu.map((item: MenuItemType, idx: number) => {
              const isManagerChildActive =
                item.adminManager?.some(
                  (m: ManagerItemType) => locationCurrent.pathname === m.href,
                ) ||
                item.staffManager?.some(
                  (m: ManagerItemType) => locationCurrent.pathname === m.href,
                ) ||
                false;
              const resolvedHref =
                (item.hrefByRole && role ? item.hrefByRole[role] : undefined) ??
                item.href ??
                "/";

              const showAdminManager = role === "admin" && item.adminManager;
              const showStaffManager = role === "staff" && item.staffManager;

              return (
                <div className={cx("tab-wrapper")} key={idx}>
                  <NavLink
                    to={resolvedHref}
                    className={({ isActive }) =>
                      cx("tab-item", {
                        "active-item": isActive || isManagerChildActive,
                      })
                    }
                    onClick={item.onClick}
                  >
                    <i className={item.icon}></i>
                    <span>{item.title}</span>
                  </NavLink>

                  {/* Admin sub-menu */}
                  {showAdminManager && (
                    <div className={cx("list-manager")}>
                      {item.adminManager!.map((manager: ManagerItemType) => (
                        <NavLink
                          key={manager.id}
                          to={manager.href}
                          className={cx("manager-item", {
                            active: locationCurrent.pathname === manager.href,
                          })}
                        >
                          <i className={manager.icon}></i>
                          <span>{manager.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}

                  {/* Staff sub-menu */}
                  {showStaffManager && (
                    <div className={cx("list-manager")}>
                      {item.staffManager!.map((manager: ManagerItemType) => (
                        <NavLink
                          key={manager.id}
                          to={manager.href}
                          className={cx("manager-item", {
                            active: locationCurrent.pathname === manager.href,
                          })}
                        >
                          <i className={manager.icon}></i>
                          <span>{manager.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={cx("menuUser-content")}>{children}</div>
      </div>
    </div>
  );
};

export default MenuUser;
