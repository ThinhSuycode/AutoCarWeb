import classNames from "classnames/bind";
import styles from "./MenuNavigation.module.scss";

const cx = classNames.bind(styles);
interface MenuNavigationType {
  onBack?: (e:React.MouseEvent) => void;
  title:string;
}

const MenuNavigation: React.FC<MenuNavigationType> = ({ onBack,title }) => {
  return (
    <div className={cx("menu-navigation")}>
      <div className={cx("left")} onClick={onBack}>
        <i className="fa-solid fa-angle-left"></i>
      </div>
      <div className={cx("right")}>{title?title:"Menu"}</div>
    </div>
  );
};

export default MenuNavigation;
