import classNames from "classnames/bind";
import styles from "./ListArticle.module.scss";
import { getLabelCategory } from "../../hooks/getCategoryColor";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import { createHandleReadArticle } from "../../hooks/HandleArticles";
import { formatDateToString } from "../../hooks/formatDate";
import type { Article } from "../../types/article/article.type";

const cx = classNames.bind(styles);

interface ListArticleType {
  data: Article[] | null;
  heading?: string;
  hiddenBtn?: boolean;
  emptyDesc?: string;
}

const ListArticle: React.FC<ListArticleType> = ({
  data,
  heading,
  hiddenBtn,
  emptyDesc,
}) => {
  const navigate = useNavigate();
  const handleReadArticle = createHandleReadArticle(navigate);
  if (!data) return <div className={cx("empty-data")}></div>;
  return (
    <div className={cx("articles-form")}>
      {heading && (
        <div className={cx("form-heading")}>
          <div className={cx("left")}>
            <h2>{heading}</h2>
            <p>Theo dõi bài viết bạn đã lưu</p>
          </div>
          {!hiddenBtn && (
            <a href={config.Routes.Articles}>
              Xem tất cả
              <i className="fa-solid fa-angle-right"></i>
            </a>
          )}
        </div>
      )}
      <div className={cx("list-articles", { fixForm: !!heading })}>
        {data.length > 0 ? (
          data.map((article: Article) => (
            <div
              className={cx("articles-item")}
              key={article._id}
              onClick={() => handleReadArticle(article)}
              data-aos="flip-right"
            >
              <div className={cx("img")}>
                <img src={article.thumbnail} alt={article.title} />
                <div className={cx("category-img", article.category)}>
                  {getLabelCategory(article.category)}
                </div>
              </div>
              <div className={cx("content")}>
                <div className={cx("post-time")}>
                  <div>
                    <span>
                      <i className="fa-regular fa-calendar"></i>
                    </span>
                    <span>{formatDateToString(article.createdAt || "")}</span>
                  </div>
                  <div>
                    <span>
                      <i className="fa-solid fa-clock"></i>
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <div className={cx("article-info")}>
                  <h4>{article.title}</h4>
                  <p>{article.excerpt}</p>
                </div>
                <div className={cx("article-add")}>
                  <span>Đọc tiếp</span>
                  <span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={cx("empty-state")}>
            {emptyDesc && (
              <i className="fa-regular fa-face-grin-beam-sweat"></i>
            )}
            <h3>{emptyDesc || ""}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListArticle;
