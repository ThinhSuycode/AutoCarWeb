import classNames from "classnames/bind";
import styles from "./ArticlesManager.module.scss";

const cx = classNames.bind(styles);
const ArticlesManager = () => {
  return (
    <div className={cx("articlesManager-page")}>
      <div className={cx("header")}>
        <h2>Quản lý bài viết</h2>
      </div>
    </div>
  );
};

export default ArticlesManager;
