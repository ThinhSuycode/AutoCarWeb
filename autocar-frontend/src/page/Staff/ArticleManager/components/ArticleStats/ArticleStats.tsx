import classNames from "classnames/bind";
import styles from "./ArticleStats.module.scss";
import type { Article } from "../../../../../types/article/article.type";

const cx = classNames.bind(styles);

interface ArticleStatsProps {
  articles: Article[];
}

const ArticleStats = ({ articles }: ArticleStatsProps) => {
  const publishedCount = articles.filter(
    (a) => a.status === "published",
  ).length;
  const draftCount = articles.filter((a) => a.status === "draft").length;

  return (
    <div className={cx("stats-grid")}>
      <div className={cx("stat-card", "blue")}>
        <div className={cx("icon")}>
          <i className="fa-regular fa-newspaper"></i>
        </div>
        <div className={cx("content")}>
          <h3>{articles.length}</h3>
          <p>Tổng bài viết</p>
        </div>
      </div>

      <div className={cx("stat-card", "green")}>
        <div className={cx("icon")}>
          <i className="fa-solid fa-earth-asia"></i>
        </div>
        <div className={cx("content")}>
          <h3>{publishedCount}</h3>
          <p>Đã đăng</p>
        </div>
      </div>

      <div className={cx("stat-card", "orange")}>
        <div className={cx("icon")}>
          <i className="fa-regular fa-pen-to-square"></i>
        </div>
        <div className={cx("content")}>
          <h3>{draftCount}</h3>
          <p>Bản nháp</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleStats;
