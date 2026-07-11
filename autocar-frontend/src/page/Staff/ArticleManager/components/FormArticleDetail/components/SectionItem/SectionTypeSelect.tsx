import classNames from "classnames/bind";
import styles from "../../FormArticleDetail.module.scss";
import { useController } from "react-hook-form";

import type { FormProps } from "./types";
import type { ArticleDetailInput } from "../../schema/ArticleDetailSchema";
import { SECTION_TYPES } from "../../constants/sectionTypes";

const cx = classNames.bind(styles);

const CLEARABLE_FIELDS = [
  "title",
  "content",
  "imageUrl",
  "alt",
  "caption",
] as const;
const HAS_CONTENT_TYPES = new Set(["paragraph", "quote", "list", "code"]);

interface Props extends Pick<FormProps, "control" | "setValue"> {
  index: number;
  currentType: string;
}

export const SectionTypeSelect = ({
  index,
  currentType,
  control,
  setValue,
}: Props) => {
  const { field: typeField } = useController({
    control,
    name: `sections.${index}.sectionType` as const,
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target
      .value as ArticleDetailInput["sections"][number]["sectionType"];

    typeField.onChange(newType);

    CLEARABLE_FIELDS.forEach((f) => {
      setValue(`sections.${index}.${f}` as any, undefined, {
        shouldValidate: false,
      });
    });

    if (HAS_CONTENT_TYPES.has(newType)) {
      setValue(`sections.${index}.content` as any, "", {
        shouldValidate: false,
      });
    }
  };

  return (
    <div className={cx("form-group")}>
      <label>Loại section</label>
      <select
        value={typeField.value ?? currentType}
        onChange={handleTypeChange}
      >
        {SECTION_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
};
