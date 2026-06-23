import classNames from "classnames/bind";
import styles from "../ArticleManager.module.scss";
import type { Articles } from "../../../../types/articles";
import { formatDateToString } from "../../../../hooks/formatDate";
import { STATUS_MAP } from "../constants/statusMapData";

const cx = classNames.bind(styles);

interface ArticleCardProps {
  article: Articles;
  onEdit: (article: Articles) => void;
  onViewDetail: (article: Articles) => void;
  onDelete: (article: Articles) => void;
}

const ArticleCard = ({
  article,
  onEdit,
  onViewDetail,
  onDelete,
}: ArticleCardProps) => {
  const status = STATUS_MAP[article.status as keyof typeof STATUS_MAP];

  return (
    <div className={cx("article-card")}>
      {/* IMAGE */}
      <div className={cx("thumbnail")}>
        <img src={article.image} alt={article.title} />
      </div>

      {/* TITLE */}
      <div className={cx("card-body")}>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
      </div>

      {/* CATEGORY */}
      <div>
        <span className={cx("category")}>{article.category}</span>
      </div>

      {/* STATUS */}
      <div>
        <span className={cx("status", status.className)}>{status.label}</span>
      </div>

      {/* READTIME */}
      <div className={cx("readTime")}>
        <span>{article.readTime}</span>
      </div>

      {/* AUTHOR */}
      <div className={cx("author")}>
        <div className={cx("avatar")}>
          {article.manager?.managerName?.charAt(0).toUpperCase()}
        </div>
        <div className={cx("info")}>
          <span>{article.manager?.managerName || "Admin"}</span>
          <small>{formatDateToString(article.createdAt || "")}</small>
        </div>
      </div>

      {/* ACTIONS */}
      <div className={cx("actions")}>
        <button className={cx("edit")} onClick={() => onEdit(article)}>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <button className={cx("view")} onClick={() => onViewDetail(article)}>
          <i className="fa-solid fa-align-left"></i>
        </button>
        <button className={cx("delete")} onClick={() => onDelete(article)}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
