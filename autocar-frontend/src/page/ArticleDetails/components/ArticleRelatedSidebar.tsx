import classNames from "classnames/bind";
import styles from "../ArticleDetails.module.scss";
import { formatDateToString } from "../../../hooks/formatDate";
import type { Articles } from "../../../types/articles";

const cx = classNames.bind(styles);

interface Props {
  relatedArticles: Articles[];
  onReadArticle: (article: Articles) => void;
}

const ArticleRelatedSidebar = ({ relatedArticles, onReadArticle }: Props) => (
  <aside className={cx("sidebar-right")}>
    <div className={cx("articles-relative")}>
      <h3 className={cx("heading-border")}>Bài Viết Liên Quan</h3>

      <div className={cx("articles-list")}>
        {relatedArticles.map((item) => (
          <div
            key={item._id}
            className={cx("articles-item")}
            onClick={() => onReadArticle(item)}
          >
            <div className={cx("image-small")}>
              <img src={item.thumbnail} alt={item.title} />
            </div>

            <div className={cx("info")}>
              <h4>{item.title}</h4>
              <div className={cx("time-read")}>
                <span>
                  <i className="fa-regular fa-calendar"></i>
                </span>
                <span>{formatDateToString(item.createdAt || "")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

export default ArticleRelatedSidebar;
