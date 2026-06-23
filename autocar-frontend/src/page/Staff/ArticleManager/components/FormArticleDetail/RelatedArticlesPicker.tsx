import classNames from "classnames/bind";
import styles from "../../ArticleManager.module.scss";
import type { Articles } from "../../../../../types/articles";
import useRelatedArticles from "./hooks/useRelatedArticles";
import { STATUS_LABEL } from "./constants/sectionTypes";

const cx = classNames.bind(styles);

interface Props {
  articlesActive: Articles;
  value: Articles[];
  onChange: (articles: Articles[]) => void;
}

const RelatedArticlesPicker = ({ value, onChange, articlesActive }: Props) => {
  const {
    query,
    setQuery,
    clearQuery,
    articles,
    isLoading,
    selectedIds,
    toggle,
    remove,
  } = useRelatedArticles({ value, onChange, articlesActive });

  return (
    <div className={cx("picker-box")}>
      {/* Search */}
      <div className={cx("picker-search")}>
        <i
          className={`fa-solid ${isLoading ? "fa-spinner fa-spin" : "fa-search"}`}
        ></i>
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            className={cx("picker-clear")}
            onClick={clearQuery}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {/* List */}
      <div className={cx("picker-list")}>
        {isLoading ? (
          <div className={cx("picker-empty")}>
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Đang tải...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className={cx("picker-empty")}>
            <i className="fa-regular fa-file-lines"></i>
            <p>Không tìm thấy bài viết</p>
          </div>
        ) : (
          articles.map((article) => {
            const isSelected = selectedIds.has(article._id);
            return (
              <div
                key={article._id}
                className={cx("picker-item", { selected: isSelected })}
                onClick={() => toggle(article)}
              >
                {article.image ? (
                  <img
                    src={article.image}
                    alt=""
                    className={cx("picker-thumb")}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className={cx("picker-thumb", "picker-thumb-empty")}>
                    <i className="fa-regular fa-image"></i>
                  </div>
                )}

                <div className={cx("picker-info")}>
                  <span className={cx("picker-title")}>{article.title}</span>
                  <div className={cx("picker-meta")}>
                    <span className={cx("badge-cat")}>{article.category}</span>
                    <span className={cx("badge-status", article.status)}>
                      {STATUS_LABEL[article.status]}
                    </span>
                  </div>
                </div>

                <div className={cx("picker-check", { checked: isSelected })}>
                  {isSelected && <i className="fa-solid fa-check"></i>}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Selected */}
      {value.length > 0 && (
        <div className={cx("picker-selected")}>
          <span className={cx("picker-selected-label")}>
            Đã chọn ({value.length}):
          </span>
          <div className={cx("picker-tags")}>
            {value.map((a) => (
              <span key={a._id} className={cx("picker-tag")}>
                <i className="fa-regular fa-file-lines"></i>
                {a.title.length > 28 ? a.title.slice(0, 28) + "…" : a.title}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(a._id);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedArticlesPicker;
