import classNames from "classnames/bind";
import styles from "../ArticleDetails.module.scss";
import {
  getColorCategory,
  getLabelCategory,
} from "../../../hooks/getCategoryColor";
import type { ArticleDetail } from "../../../types/articles";
import { formatDateToString } from "../../../hooks/formatDate";

const cx = classNames.bind(styles);

interface Props {
  articleDetail: ArticleDetail;
  onSave: () => void;
  isSaved: boolean;
}
const ArticleDetailBanner = ({ articleDetail, onSave, isSaved }: Props) => {
  return (
    <div className={cx("articleDetail-banner")}>
      <div className={cx("category", articleDetail.articleId.category)}>
        {getLabelCategory(articleDetail.articleId.category)}
      </div>

      <h2 className={cx("main-title")}>{articleDetail.articleId.title}</h2>

      <p className={cx("excerpt")}>{articleDetail.articleId.excerpt}</p>

      <div className={cx("meta-info")}>
        <div className={cx("info-user")}>
          <div className={cx("left")}>
            <div className={cx("info-item")}>
              <span className={cx("icon")}>
                <i className="fa-solid fa-user"></i>
              </span>

              <div className={cx("author-info")}>
                <div className={cx("name")}>
                  {articleDetail.articleId.manager?.managerName ?? "AutoViet"}
                </div>

                <div className={cx("role")}>Tác giả</div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("right")}>
          <div className={cx("user")}>
            <div className={cx("info-item")}>
              <span className={cx("icon")}>
                <i className="fa-regular fa-calendar"></i>
              </span>

              <span>
                {formatDateToString(articleDetail.articleId.createdAt || "")}
              </span>
            </div>

            <div className={cx("info-item")}>
              <span className={cx("icon")}>
                <i className="fa-solid fa-clock"></i>
              </span>

              <span>{articleDetail.articleId.readTime}</span>
            </div>
          </div>

          <div className={cx("action-wrapper")}>
            <span
              className={cx("action-btn", { saved: isSaved })}
              onClick={onSave}
              title={isSaved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
            >
              <i
                className={
                  isSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
                }
              ></i>
            </span>

            <span className={cx("action-btn")}>
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailBanner;
