import classNames from "classnames/bind";
import styles from "./FormArticleDetail.module.scss";
import RelatedArticlesPicker from "./components/RelatedArticlesPicker";
import type {
  ArticleDetailInput,
  ArticleDetailOutput,
} from "./schema/ArticleDetailSchema";

import { useArticleDetailForm } from "./hooks/useArticleDetails";
import { SectionItem } from "./components/SectionItem/SectionItem";
import type { Article } from "../../../../../types/article/article.type";

const cx = classNames.bind(styles);

interface Props {
  openDetail: Article;
  onSubmit: (data: ArticleDetailOutput) => void;
  closeModal: () => void;
  defaultValues?: ArticleDetailInput;
  onDraftChange?: (draft: ArticleDetailInput) => void;
  isLoading?: boolean;
}

const FormArticleDetail = ({
  onSubmit,
  closeModal,
  defaultValues,
  onDraftChange,
  isLoading = false,
  openDetail,
}: Props) => {
  const hasExisting = !!(
    defaultValues?.sections?.length ||
    defaultValues?.tags?.length ||
    defaultValues?.relatedArticles?.length
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    relatedField,
    sectionArray,
    watchedSections,
    errors,
    isSubmitted,
  } = useArticleDetailForm({
    articleId: openDetail._id,
    defaultValues,
    onDraftChange,
  });

  const { fields, append, remove, move } = sectionArray;

  return (
    <div
      className={cx("modal", "modal-detail")}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={cx("modal-header")}>
        <h3>
          <i className="fa-solid fa-align-left" />
          {hasExisting ? "Chỉnh sửa nội dung" : "Tạo nội dung bài viết"}
        </h3>
        <button className={cx("close-btn")} onClick={closeModal}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={cx("detail-form")}>
        <div className={cx("section-block")}>
          <div className={cx("block-header")}>
            <span>
              <i className="fa-solid fa-layer-group" /> Sections (
              {fields.length})
            </span>
            <button
              type="button"
              className={cx("add-section")}
              onClick={() => append({ sectionType: "paragraph", content: "" })}
            >
              <i className="fa-solid fa-plus" /> Thêm section
            </button>
          </div>

          <div className={cx("detail-list")}>
            {fields.length === 0 && (
              <div className={cx("empty-sections")}>
                <i className="fa-regular fa-file-lines" />
                <p>Chưa có section nào</p>
              </div>
            )}
            {fields.map((field, index) => {
              const currentType =
                watchedSections?.[index]?.sectionType ?? "paragraph";
              const imageUrl = (watchedSections?.[index] as any)?.imageUrl;

              return (
                <SectionItem
                  key={field.id}
                  fieldId={field.id}
                  index={index}
                  total={fields.length}
                  currentType={currentType}
                  imageUrl={imageUrl}
                  control={control}
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  isSubmitted={isSubmitted}
                  onMoveUp={() => move(index, index - 1)}
                  onMoveDown={() => move(index, index + 1)}
                  onRemove={() => remove(index)}
                />
              );
            })}
          </div>
          {isSubmitted && errors.sections && (
            <small className={cx("error")}>{errors.sections.message}</small>
          )}
        </div>

        <div className={cx("form-group")}>
          <label>
            <i className="fa-solid fa-tags" /> Tags
          </label>
          <input
            type="text"
            placeholder="toyota, honda, xe điện..."
            {...register("tags")}
          />
          <small>Nhập các tag cách nhau bằng dấu phẩy</small>

          {isSubmitted && errors?.tags && (
            <span className={cx("error")}>{errors.tags.message}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label>
            <i className="fa-solid fa-link" /> Bài viết liên quan
          </label>
          <RelatedArticlesPicker
            value={relatedField.value || []}
            onChange={relatedField.onChange}
            articlesActive={openDetail}
          />
        </div>

        <div className={cx("modal-actions")}>
          <button type="button" className={cx("cancel")} onClick={closeModal}>
            Huỷ
          </button>
          <button type="submit" className={cx("submit")} disabled={isLoading}>
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner" /> Đang lưu...
              </>
            ) : (
              <>
                <i className="fa-regular fa-floppy-disk" /> Lưu nội dung
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormArticleDetail;
