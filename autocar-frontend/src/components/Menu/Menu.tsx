import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import MenuNavigation from "../MenuNavigation/MenuNavigation";
import { useCallback, useState } from "react";

import type { MenuItemType } from "../../types/menu/menu.type";
import type { SubMenuType } from "../../types/menu/navigation.type";
import type { Role } from "../../types/common/role.type";
import { MenuItem } from "./MenuItem/MenuItem";
import type { LanguageType } from "../../types/common/language.type";

const cx = classNames.bind(styles);

const Menu = ({ items, role }: { items: MenuItemType[]; role: string }) => {
  const [subMenu, setSubMenu] = useState<SubMenuType | null>(null);
  const onHandleBack = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSubMenu(null);
  }, []);
  const handleShowChildren = useCallback((menu: MenuItemType) => {
    if (menu.children) {
      setSubMenu({
        title: menu.title,
        children: menu.children,
      });
    }
  }, []);

  return (
    <div className={cx("menu-inner")}>
      {!subMenu?.children ? (
        <div onClick={(e) => e.stopPropagation()}>
          {items.map((menu: MenuItemType) => {
            const resolvedHref =
              (menu.hrefByRole && role
                ? menu.hrefByRole[role as Role]
                : undefined) ??
              menu.href ??
              "/";
            return (
              <MenuItem
                key={menu.title}
                href={resolvedHref}
                icon={menu.icon}
                title={menu.title}
                onClick={menu.onClick}
                children={menu.children}
                role={menu.role}
                currentUserRole={role}
                onShowChildren={() => handleShowChildren(menu)}
              />
            );
          })}
        </div>
      ) : (
        <>
          <MenuNavigation title={subMenu?.title || ""} onBack={onHandleBack} />
          {subMenu.children.map((child: LanguageType) => (
            <MenuItem
              title={child.title}
              key={child.id}
              href={child.href}
            ></MenuItem>
          ))}
        </>
      )}
    </div>
  );
};

export default Menu;
