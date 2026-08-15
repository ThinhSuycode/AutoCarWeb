import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);
const Header = ({ onClose }: { onClose: () => void }) => {
  return (
    <header className={cx("header")}>
      <div>
        <h2>Chi tiết lịch hẹn</h2>

        <p>Mọi thông tin về lịch hẹn của bạn.</p>
      </div>

      <button className={cx("icon-close")} onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </header>
  );
};

export default Header;
