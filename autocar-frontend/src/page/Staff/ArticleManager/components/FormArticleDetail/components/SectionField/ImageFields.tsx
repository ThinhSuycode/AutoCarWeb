import classNames from "classnames/bind";
import styles from "../../FormArticleDetail.module.scss";
import type { UseFormRegister } from "react-hook-form";
import type { ArticleDetailInput } from "../../schema/ArticleDetailSchema";

const cx = classNames.bind(styles);

interface Props {
  index: number;
  register: UseFormRegister<ArticleDetailInput>;
  imageUrl?: string;
  errors?: Record<string, any>;
}

export const ImageFields = ({ index, register, imageUrl, errors }: Props) => {
  const r = (path: string) => register(`sections.${index}.${path}` as any);

  return (
    <>
      <div className={cx("form-group")}>
        <label>URL hình ảnh</label>
        <input type="text" placeholder="https://..." {...r("imageUrl")} />
        {errors?.imageUrl && (
          <small className={cx("error")}>{errors.imageUrl.message}</small>
        )}
      </div>

      <div className={cx("form-group")}>
        <label>Alt text</label>
        <input
          type="text"
          placeholder="Mô tả hình ảnh cho SEO & accessibility..."
          {...r("alt")}
        />
        <small>Giúp SEO và người dùng khuyết tật đọc màn hình</small>
      </div>

      <div className={cx("form-group")}>
        <label>Chú thích (tuỳ chọn)</label>
        <input
          type="text"
          placeholder="Chú thích hiển thị dưới ảnh..."
          {...r("caption")}
        />
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="preview"
          className={cx("img-preview")}
          onError={(e) =>
            ((e.target as HTMLImageElement).style.display = "none")
          }
        />
      )}
    </>
  );
};
