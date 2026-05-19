import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import MenuNavigation from "../MenuNavigation/MenuNavigation";
import { useCallback, useState } from "react";
import type {
  LanguageType,
  MenuItemType,
  Role,
  SubMenuType,
} from "../../types/menu";
import { MenuItem } from "./MenuItem/MenuItem";

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
              key={child.key}
              href={child.href}
            ></MenuItem>
          ))}
        </>
      )}
    </div>
  );
};

export default Menu;
