import classNames from "classnames/bind";
import styles from "../../ArticleManager.module.scss";
import {
  useFieldArray,
  useForm,
  useWatch,
  useController,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import RelatedArticlesPicker from "./RelatedArticlesPicker";
import {
  articleDetailFormSchema,
  type ArticleDetailFormInput,
  type ArticleDetailFormOutput,
} from "../../components/FormArticleDetail/schema/ArticleDetailSchema";
import {
  SECTION_TYPES,
  getSectionIcon,
  getSectionLabel,
  getContentFieldConfig,
} from "./constants/sectionTypes";
import type { Articles } from "../../../../../types/articles";

const cx = classNames.bind(styles);

interface Props {
  openDetail: Articles;
  onSubmit: (data: ArticleDetailFormOutput) => void;
  closeModal: () => void;
  defaultValues?: ArticleDetailFormInput;
  onDraftChange?: (draft: ArticleDetailFormInput) => void;
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
    (defaultValues?.tags && defaultValues.tags.length > 0) ||
    defaultValues?.relatedArticles?.length
  );

  const { register, control, handleSubmit, watch } = useForm<
    ArticleDetailFormInput,
    unknown,
    ArticleDetailFormOutput
  >({
    resolver: zodResolver(articleDetailFormSchema),
    defaultValues: defaultValues ?? {
      sections: [{ sectionType: "paragraph", content: "" }],
      tags: "",
      relatedArticles: [],
    },
  });

  const { field: relatedField } = useController({
    control,
    name: "relatedArticles",
    defaultValue: defaultValues?.relatedArticles ?? [],
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "sections",
  });

  const formValues = watch();

  useEffect(() => {
    onDraftChange?.(formValues);
  }, [JSON.stringify(formValues)]);

  const watchedSections = useWatch({ control, name: "sections" });

  return (
    <div
      className={cx("modal", "modal-detail")}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Header ── */}
      <div className={cx("modal-header")}>
        <h3>
          <i className="fa-solid fa-align-left"></i>
          {hasExisting ? "Chỉnh sửa nội dung" : "Tạo nội dung bài viết"}
        </h3>
        <button type="button" onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* ── Form ── */}
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className={cx("detail-form")}
      >
        {/* ── Sections ── */}
        <div className={cx("section-block")}>
          <div className={cx("block-header")}>
            <span>
              <i className="fa-solid fa-layer-group"></i>
              Sections ({fields.length})
            </span>
            <button
              type="button"
              className={cx("add-section")}
              onClick={() => append({ sectionType: "paragraph", content: "" })}
            >
              <i className="fa-solid fa-plus"></i>
              Thêm section
            </button>
          </div>

          <div className={cx("detail-list")}>
            {fields.length === 0 && (
              <div className={cx("empty-sections")}>
                <i className="fa-regular fa-file-lines"></i>
                <p>Chưa có section nào</p>
              </div>
            )}

            {fields.map((field, index) => {
              const currentType =
                watchedSections?.[index]?.sectionType ?? "paragraph";

              const { label, placeholder, rows } =
                getContentFieldConfig(currentType);

              return (
                <div key={field.id} className={cx("detail-item")}>
                  {/* Section header */}
                  <div className={cx("section-item-header")}>
                    <span className={cx("section-index")}>#{index + 1}</span>
                    <span className={cx("section-type-badge", currentType)}>
                      <i
                        className={`fa-solid ${getSectionIcon(currentType)}`}
                      ></i>
                      {getSectionLabel(currentType)}
                    </span>
                    <div className={cx("section-item-actions")}>
                      {index > 0 && (
                        <button
                          type="button"
                          className={cx("move-btn")}
                          onClick={() => move(index, index - 1)}
                          title="Di chuyển lên"
                        >
                          <i className="fa-solid fa-chevron-up"></i>
                        </button>
                      )}
                      {index < fields.length - 1 && (
                        <button
                          type="button"
                          className={cx("move-btn")}
                          onClick={() => move(index, index + 1)}
                          title="Di chuyển xuống"
                        >
                          <i className="fa-solid fa-chevron-down"></i>
                        </button>
                      )}
                      <button
                        type="button"
                        className={cx("remove-section")}
                        onClick={() => remove(index)}
                        title="Xoá section"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  {/* Section type select */}
                  <div className={cx("form-group")}>
                    <label>Loại section</label>
                    <select {...register(`sections.${index}.sectionType`)}>
                      {SECTION_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Content — chỉ là register thuần, schema lo phần transform */}
                  {currentType !== "image" && (
                    <div className={cx("form-group")}>
                      <label>{label}</label>
                      <textarea
                        rows={rows}
                        placeholder={placeholder}
                        {...register(`sections.${index}.content`)}
                      />
                    </div>
                  )}

                  {/* Image */}
                  {currentType === "image" && (
                    <>
                      <div className={cx("form-group")}>
                        <label>URL hình ảnh</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          {...register(`sections.${index}.imageUrl`)}
                        />
                      </div>
                      <div className={cx("form-group")}>
                        <label>Chú thích (tuỳ chọn)</label>
                        <input
                          type="text"
                          placeholder="Mô tả hình ảnh..."
                          {...register(`sections.${index}.caption`)}
                        />
                      </div>
                      {(watchedSections?.[index] as any)?.imageUrl && (
                        <img
                          src={(watchedSections?.[index] as any).imageUrl}
                          alt="preview"
                          className={cx("img-preview")}
                          onError={(e) =>
                            ((e.target as HTMLImageElement).style.display =
                              "none")
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Tags — register thuần, schema transform "a, b" → ["a","b"] ── */}
        <div className={cx("form-group")}>
          <label>
            <i className="fa-solid fa-tags"></i>
            Tags
          </label>
          <input
            type="text"
            placeholder="toyota, honda, xe điện..."
            {...register("tags")}
          />
          <small>Nhập các tag cách nhau bằng dấu phẩy</small>
        </div>

        {/* ── Related articles ── */}
        <div className={cx("form-group")}>
          <label>
            <i className="fa-solid fa-link"></i>
            Bài viết liên quan
          </label>
          <RelatedArticlesPicker
            value={relatedField.value as Articles[]}
            onChange={relatedField.onChange}
            articlesActive={openDetail}
          />
        </div>

        {/* ── Actions ── */}
        <div className={cx("modal-actions")}>
          <button type="button" className={cx("cancel")} onClick={closeModal}>
            Huỷ
          </button>
          <button type="submit" className={cx("submit")} disabled={isLoading}>
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner"></i> Đang lưu...
              </>
            ) : (
              <>
                <i className="fa-regular fa-floppy-disk"></i> Lưu nội dung
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormArticleDetail;
