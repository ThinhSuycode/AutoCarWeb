// types.ts
import type { UseFormRegister } from "react-hook-form";
import type { ArticleDetailInput } from "../../schema/ArticleDetailSchema";

export interface SectionFieldsProps {
  index: number;
  currentType: string;
  register: UseFormRegister<ArticleDetailInput>;
  imageUrl?: string;
  errors?: Record<string, any>;
}
