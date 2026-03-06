import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import MenuNavigation from "../MenuNavigation/MenuNavigation";
import type {
  LanguageType,
  MenuCustomerType,
} from "../../layout/Component/Header/HeaderData";
import MenuItem from "./MenuItem/MenuItem";
import { useCallback, useState } from "react";

const cx = classNames.bind(styles);
interface SubMenuType {
  title: string;
  children: LanguageType[];
}
const Menu = ({ items }: { items: MenuCustomerType[] }) => {
  const [subMenu, setSubMenu] = useState<SubMenuType | null>(null);
  const onHandleBack = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSubMenu(null);
  }, []);
  const handleShowChildren = useCallback((menu: MenuCustomerType) => {
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
          {items.map((menu: MenuCustomerType) => (
            <MenuItem
              href={menu?.href}
              icon={menu.icon}
              title={menu.title}
              key={menu.id}
              onClick={menu.onClick}
              children={menu.children}
              onShowChildren={() => handleShowChildren(menu)}
            ></MenuItem>
          ))}
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
