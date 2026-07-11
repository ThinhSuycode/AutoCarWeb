import classNames from "classnames/bind";
import styles from "./ArticleCard.module.scss";

import type { Articles } from "../../../../../types/articles";
import { formatDateToString } from "../../../../../hooks/formatDate";
import { STATUS_MAP } from "../../constants/statusMapData";
import { getLabelCategory } from "../../../../../hooks/getCategoryColor";

const cx = classNames.bind(styles);

interface ArticleCardProps {
  article: Articles;
  onEdit: (article: Articles) => void;
  onViewDetail: (article: Articles) => void;
  onDelete: (article: Articles) => void;
}

const DEFAULT_STATUS = {
  label: "Không xác định",
  className: "draft",
};

const ArticleCard = ({
  article,
  onEdit,
  onViewDetail,
  onDelete,
}: ArticleCardProps) => {
  const status = STATUS_MAP[article.status] ?? DEFAULT_STATUS;

  return (
    <div className={cx("article-card")}>
      {/* IMAGE */}
      <div className={cx("thumbnail")}>
        <img
          src={article.thumbnail}
          alt={article.title}
          onError={(e) => {
            e.currentTarget.src = "/images/no-image.png";
          }}
        />
      </div>

      {/* TITLE */}
      <div className={cx("card-body")}>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
      </div>

      {/* CATEGORY */}
      <div className={cx("category")}>
        <span>{getLabelCategory(article.category)}</span>
      </div>

      {/* STATUS */}
      <div>
        <span className={cx("status", status.className)}>{status.label}</span>
      </div>

      {/* READ TIME */}
      <div className={cx("readTime")}>
        <span>{article.readTime || "--"}</span>
      </div>

      {/* AUTHOR */}
      <div className={cx("author")}>
        <div className={cx("avatar")}>
          {article.manager?.managerName?.charAt(0)?.toUpperCase() ?? "A"}
        </div>

        <div className={cx("info")}>
          <span>{article.manager?.managerName ?? "Admin"}</span>

          <small>
            {article.createdAt
              ? formatDateToString(article.createdAt)
              : "--/--/----"}
          </small>
        </div>
      </div>

      {/* ACTIONS */}
      <div className={cx("actions")}>
        <button
          type="button"
          className={cx("edit")}
          onClick={() => onEdit(article)}
        >
          <i className="fa-regular fa-pen-to-square" />
        </button>

        <button
          type="button"
          className={cx("view")}
          onClick={() => onViewDetail(article)}
        >
          <i className="fa-solid fa-align-left" />
        </button>

        <button
          type="button"
          className={cx("delete")}
          onClick={() => onDelete(article)}
        >
          <i className="fa-regular fa-trash-can" />
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
