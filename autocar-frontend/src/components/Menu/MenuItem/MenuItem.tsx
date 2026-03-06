import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import type React from "react";
import type { LanguageType } from "../../../types/menu";

const cx = classNames.bind(styles);
interface MenuItemType {
  icon?: string;
  title: string;
  href?: string;
  children?: LanguageType[];
  onClick?: () => void;
  onShowChildren?: () => void;
}
const MenuItem: React.FC<MenuItemType> = ({
  icon,
  title,
  href,
  onClick,
  children,
  onShowChildren,
}) => {
  const hasChildren = children && children.length > 0;
  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.stopPropagation();
      onShowChildren?.();
    } else {
      onClick?.();
    }
  };
  return (
    <a
      href={hasChildren ? undefined : href}
      className={cx("menuItem-inner")}
      onClick={handleClick}
    >
      <div className={cx("icon")}>
        <i className={`${icon}`}></i>
      </div>
      <div className={cx("title")}>{title}</div>
    </a>
  );
};

export default MenuItem;
