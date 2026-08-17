import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import type { MenuItemType } from "../../../types/menu/menu.type";
const cx = classNames.bind(styles);

export const MenuItem: React.FC<
  MenuItemType & { currentUserRole?: string }
> = ({
  id,
  icon,
  title,
  href,
  onClick,
  children,
  onShowChildren,
  role,
  currentUserRole,
}) => {
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(currentUserRole as any)) {
      return null;
    }
  }

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
      key={id}
      onClick={handleClick}
    >
      <div className={cx("icon")}>
        <i className={`${icon}`}></i>
      </div>
      <div className={cx("title")}>{title}</div>
    </a>
  );
};
