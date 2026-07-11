// VideoFields.tsx
import classNames from "classnames/bind";
import styles from "../../FormArticleDetail.module.scss";
import type { UseFormRegister } from "react-hook-form";
import type { ArticleDetailInput } from "../../schema/ArticleDetailSchema";

const cx = classNames.bind(styles);

interface Props {
  index: number;
  register: UseFormRegister<ArticleDetailInput>;
  errors?: Record<string, any>;
}

export const VideoFields = ({ index, register, errors }: Props) => {
  const r = (path: string) => register(`sections.${index}.${path}` as any);

  return (
    <>
      <div className={cx("form-group")}>
        <label>URL video</label>
        <input
          type="text"
          placeholder="https://youtube.com/..."
          {...r("imageUrl")}
        />
        {errors?.imageUrl && (
          <small className={cx("error")}>{errors.imageUrl.message}</small>
        )}
        <small>Hỗ trợ YouTube, Vimeo hoặc link video trực tiếp</small>
      </div>

      <div className={cx("form-group")}>
        <label>Chú thích (tuỳ chọn)</label>
        <input type="text" placeholder="Mô tả video..." {...r("caption")} />
      </div>
    </>
  );
};
