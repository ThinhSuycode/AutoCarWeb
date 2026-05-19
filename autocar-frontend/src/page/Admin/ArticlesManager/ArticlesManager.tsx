import classNames from "classnames/bind";
import styles from "./ArticlesManager.module.scss";

const cx = classNames.bind(styles);
const ArticlesManager = () => {
  return <div className={cx("articlesManager-page")}></div>;
};

export default ArticlesManager;
