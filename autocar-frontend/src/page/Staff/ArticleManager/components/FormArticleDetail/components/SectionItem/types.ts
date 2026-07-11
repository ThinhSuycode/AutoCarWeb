import type {
  UseFormReturn,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type {
  ArticleDetailInput,
  ArticleDetailOutput,
} from "../../schema/ArticleDetailSchema";

// Gom 3 form props hay lặp lại thành 1 type
export interface FormProps {
  control: UseFormReturn<
    ArticleDetailInput,
    unknown,
    ArticleDetailOutput
  >["control"];
  register: UseFormRegister<ArticleDetailInput>;
  setValue: UseFormSetValue<ArticleDetailInput>;
  errors: UseFormReturn<
    ArticleDetailInput,
    unknown,
    ArticleDetailOutput
  >["formState"]["errors"];
}

export interface SectionItemProps extends FormProps {
  index: number;
  fieldId: string;
  total: number;
  currentType: string;
  imageUrl?: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  isSubmitted: boolean;
}
