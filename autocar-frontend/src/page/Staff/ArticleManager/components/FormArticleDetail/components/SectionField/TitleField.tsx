import classNames from "classnames/bind";
import styles from "../../FormArticleDetail.module.scss";
import type { UseFormRegister } from "react-hook-form";
import type { ArticleDetailInput } from "../../schema/ArticleDetailSchema";

const cx = classNames.bind(styles);

interface Props {
  index: number;
  currentType: string;
  register: UseFormRegister<ArticleDetailInput>;
  errors?: Record<string, any>;
}

export const TitleField = ({ index, currentType, register, errors }: Props) => {
  const isHeading = currentType === "heading";
  const isVideo = currentType === "video";

  return (
    <div className={cx("form-group")}>
      <label>
        {isHeading
          ? "Tiêu đề"
          : isVideo
            ? "Tiêu đề video (tuỳ chọn)"
            : "Tiêu đề (tuỳ chọn)"}
      </label>
      <input
        type="text"
        placeholder={
          isHeading ? "Nhập tiêu đề..." : "Tiêu đề hiển thị phía trên..."
        }
        {...register(`sections.${index}.title` as any)}
      />
      {errors?.title && (
        <small className={cx("error")}>{errors.title.message}</small>
      )}
    </div>
  );
};
