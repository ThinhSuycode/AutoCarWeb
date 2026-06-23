import classNames from "classnames/bind";
import styles from "../../../ArticleManager.module.scss";
import { useController, type Control } from "react-hook-form";
import type { ArticleDetailForm } from "../../../../../../types/articles";
import { getContentFieldConfig } from "../constants/sectionTypes";

const cx = classNames.bind(styles);

interface SectionContentProps {
  control: Control<ArticleDetailForm>;
  index: number;
  currentType: string;
}

const SectionContent = ({
  control,
  index,
  currentType,
}: SectionContentProps) => {
  const { field } = useController({
    control,
    name: `sections.${index}.content`,
  });

  const { label, placeholder, rows } = getContentFieldConfig(currentType);

  return (
    <div className={cx("form-group")}>
      <label>{label}</label>
      <textarea rows={rows} placeholder={placeholder} {...field} />
    </div>
  );
};

export default SectionContent;
