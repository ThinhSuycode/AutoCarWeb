// SectionFields.tsx — orchestrator
import { TitleField } from "./TitleField";
import { ContentField } from "./ContentField";
import { VideoFields } from "./VideoFields";
import type { SectionFieldsProps } from "./types";
import { ImageFields } from "./ImageFields";

const HAS_TITLE = new Set(["heading", "quote", "video", "code"]);
const HAS_CONTENT = new Set(["paragraph", "quote", "list", "code"]);

export const SectionFields = ({
  index,
  currentType,
  register,
  imageUrl,
  errors,
}: SectionFieldsProps) => (
  <>
    {HAS_TITLE.has(currentType) && (
      <TitleField
        index={index}
        currentType={currentType}
        register={register}
        errors={errors}
      />
    )}

    {HAS_CONTENT.has(currentType) && (
      <ContentField
        index={index}
        currentType={currentType}
        register={register}
        errors={errors}
      />
    )}

    {currentType === "image" && (
      <ImageFields
        index={index}
        register={register}
        imageUrl={imageUrl}
        errors={errors}
      />
    )}

    {currentType === "video" && (
      <VideoFields index={index} register={register} errors={errors} />
    )}
  </>
);
