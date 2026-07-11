import classNames from "classnames/bind";
import styles from "../ArticlesManager.module.scss";
import type { Articles } from "../../../../types/articles";
import { STATUS_CONFIG } from "../utils/statusMap";
import { getLabelCategory } from "../../../../hooks/getCategoryColor";

const cx = classNames.bind(styles);

interface Props {
  article: Articles;
  isUpdating: boolean;
  onUpdateStatus: (payload: { id: string; status: Articles["status"] }) => void;
}

export const ArticleRow = ({ article, isUpdating, onUpdateStatus }: Props) => {
  const config = STATUS_CONFIG[article.status];
  return (
    <tr>
      {/* Bài viết */}
      <td>
        <div className={cx("article-cell")}>
          <img
            src={article.thumbnail}
            alt={article.title}
            className={cx("thumbnail")}
            onError={(e) =>
              ((e.target as HTMLImageElement).style.display = "none")
            }
          />
          <div className={cx("article-info")}>
            <span className={cx("article-title")}>{article.title}</span>
            <span className={cx("article-excerpt")}>{article.excerpt}</span>
          </div>
        </div>
      </td>

      {/* Danh mục */}
      <td>
        <span className={cx("category-badge")}>
          {getLabelCategory(article.category)}
        </span>
      </td>

      {/* Tác giả */}
      <td>
        <div className={cx("author-cell")}>
          <div className={cx("avatar")}>
            {article.manager?.managerName?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <span>{article.manager?.managerName ?? "—"}</span>
        </div>
      </td>

      {/* Lượt xem */}
      <td>
        <span className={cx("views")}>
          <i className="fa-regular fa-eye" />
          {article.views.toLocaleString("vi-VN")}
        </span>
      </td>

      {/* Trạng thái */}
      <td>
        <span className={cx("status-badge", config.className)}>
          {config.label}
        </span>
      </td>

      {/* Ngày tạo */}
      <td className={cx("date")}>
        {new Date(article.createdAt).toLocaleDateString("vi-VN")}
      </td>

      {/* Hành động */}
      <td>
        <div className={cx("action-buttons")}>
          {config.actions.map((action) => (
            <button
              key={action.value}
              className={cx("action-btn", action.value)}
              disabled={isUpdating}
              onClick={() =>
                onUpdateStatus({ id: article._id, status: action.value })
              }
            >
              {action.label}
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
};
