import classNames from "classnames/bind";
import styles from "../../FormArticleDetail.module.scss";
import type { UseFormRegister } from "react-hook-form";
import { getContentFieldConfig } from "../../constants/sectionTypes";
import type { ArticleDetailInput } from "../../schema/ArticleDetailSchema";

const cx = classNames.bind(styles);

interface Props {
  index: number;
  currentType: string;
  register: UseFormRegister<ArticleDetailInput>;
  errors?: Record<string, any>;
}

export const ContentField = ({
  index,
  currentType,
  register,
  errors,
}: Props) => {
  const { label, placeholder, rows } = getContentFieldConfig(currentType);
  const isList = currentType === "list";
  const isCode = currentType === "code";

  return (
    <div className={cx("form-group")}>
      <label>{label}</label>
      <textarea
        rows={rows}
        placeholder={
          isList
            ? "Mỗi mục một dòng..."
            : isCode
              ? "Dán code vào đây..."
              : placeholder
        }
        {...register(`sections.${index}.content` as any)}
      />
      {isList && <small>Mỗi dòng là một mục trong danh sách</small>}
      {isCode && <small>Nội dung sẽ được hiển thị trong khối code</small>}
      {errors?.content && (
        <small className={cx("error")}>{errors.content.message}</small>
      )}
    </div>
  );
};
