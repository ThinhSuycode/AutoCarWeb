import classNames from "classnames/bind";
import styles from "../Articles.module.scss";
import { Button } from "../../../components/Button/Button";

const cx = classNames.bind(styles);

const ArticleRegister = () => {
  return (
    <div className={cx("register-news")} data-aos="fade-up">
      <h3>Đăng Ký Nhận Tin Tức</h3>

      <p>Nhận thông tin về xe mới, khuyến mãi và mẹo chăm sóc xe hữu ích.</p>

      <div className={cx("form-send")}>
        <input type="text" placeholder="Nhập email của bạn..." />

        <Button>Đăng ký</Button>
      </div>
    </div>
  );
};

export default ArticleRegister;
