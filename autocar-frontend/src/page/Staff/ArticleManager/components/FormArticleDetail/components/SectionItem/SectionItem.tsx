// SectionItem.tsx — orchestrator: header + type select + fields
import classNames from "classnames/bind";
import styles from "../../FormArticleDetail.module.scss";
import { SectionTypeSelect } from "./SectionTypeSelect";
import type { SectionItemProps } from "./types";
import { SectionFields } from "../SectionField/SectionFields";
import { SectionItemHeader } from "./SectionItemHeader";

const cx = classNames.bind(styles);

export const SectionItem = ({
  index,
  fieldId,
  total,
  currentType,
  imageUrl,
  control,
  register,
  setValue,
  errors,
  onMoveUp,
  onMoveDown,
  onRemove,
}: SectionItemProps) => (
  <div key={fieldId} className={cx("detail-item")}>
    <SectionItemHeader
      index={index}
      total={total}
      currentType={currentType}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onRemove={onRemove}
    />

    {/* 2. Select loại section + reset logic */}
    <SectionTypeSelect
      index={index}
      currentType={currentType}
      control={control}
      setValue={setValue}
    />

    {/* 3. Dynamic fields theo sectionType */}
    <SectionFields
      index={index}
      currentType={currentType}
      register={register}
      imageUrl={imageUrl}
      errors={(errors.sections as any)?.[index]}
    />
  </div>
);
