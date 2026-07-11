import classNames from "classnames/bind";
import styles from "./FormArticle.module.scss";
import {
  type ArticleFormInput,
  type ArticleFormOutput,
} from "./schema/article.schema";

import { STATUS_LABEL } from "../FormArticleDetail/constants/sectionTypes";
import { ARTICLE_CATEGORIES } from "../../../../../constants/articleData";
import { useArticlesForm } from "./hooks/useArticlesForm";

const cx = classNames.bind(styles);

interface Props {
  mode: "create" | "update";
  defaultValues?: Partial<ArticleFormInput>;
  onSubmit: (data: ArticleFormOutput) => void;
  closeModal: () => void;
  onDraftChange?: (draft: Partial<ArticleFormInput>) => void;
}

const FormArticle = ({
  mode,
  defaultValues,
  onSubmit,
  closeModal,
  onDraftChange,
}: Props) => {
  const {
    previewError,
    register,
    handleSubmit,
    slug,
    statusOptions,
    errors,
    thumbnail,
    setPreviewError,
  } = useArticlesForm({ mode, defaultValues, onDraftChange });
  return (
    <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
      <div className={cx("modal-header")}>
        <h3>{mode === "create" ? "Tạo bài viết" : "Chỉnh sửa bài viết"}</h3>

        <button type="button" onClick={closeModal}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className={cx("form-group")}>
          <label>Tiêu đề *</label>

          <input
            type="text"
            placeholder="Nhập tiêu đề..."
            {...register("title")}
          />

          {errors.title && (
            <small className={cx("error")}>{errors.title.message}</small>
          )}
        </div>

        {/* Slug */}
        <div className={cx("form-group")}>
          <label>Slug *</label>

          <input
            type="text"
            placeholder="slug-bai-viet"
            {...register("slug")}
          />

          <small className={cx("hint")}>URL: /chi-tiet-bai-viet/{slug}</small>

          {errors.slug && (
            <small className={cx("error")}>{errors.slug.message}</small>
          )}
        </div>

        {/* Excerpt */}
        <div className={cx("form-group")}>
          <label>Mô tả ngắn *</label>

          <textarea rows={4} {...register("excerpt")} />

          {errors.excerpt && (
            <small className={cx("error")}>{errors.excerpt.message}</small>
          )}
        </div>

        {/* Thumbnail */}
        <div className={cx("form-group")}>
          <label>Thumbnail *</label>

          <input
            type="text"
            placeholder="https://..."
            {...register("thumbnail")}
          />

          {thumbnail && !previewError && (
            <img
              src={thumbnail}
              className={cx("thumbnail-preview")}
              onError={() => setPreviewError(true)}
            />
          )}

          {errors.thumbnail && (
            <small className={cx("error")}>{errors.thumbnail.message}</small>
          )}
        </div>
        <div className={cx("grid-2")}>
          <div className={cx("form-group")}>
            <label>Danh mục</label>
            <select {...register("category")}>
              <option key={null} value="">
                -- Chọn danh mục --
              </option>

              {ARTICLE_CATEGORIES?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className={cx("form-group")}>
            <label>Thời gian đọc</label>

            <input placeholder="5 phút" {...register("readTime")} />

            {errors.readTime && (
              <small className={cx("error")}>{errors.readTime.message}</small>
            )}
          </div>
        </div>

        <div className={cx("form-group")}>
          <label>Trạng thái</label>

          <select {...register("status")}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABEL[status]}
              </option>
            ))}
          </select>

          {errors.status && (
            <small className={cx("error")}>{errors.status.message}</small>
          )}
        </div>

        <div className={cx("modal-actions")}>
          <button type="button" className={cx("cancel")} onClick={closeModal}>
            Huỷ
          </button>

          <button type="submit" className={cx("submit")}>
            {mode === "create" ? "Tạo bài viết" : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormArticle;
