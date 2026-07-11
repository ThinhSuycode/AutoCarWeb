import { useEffect } from "react";
import {
  useController,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  articleDetailSchema,
  type ArticleDetailInput,
  type ArticleDetailOutput,
} from "../schema/ArticleDetailSchema";

interface Props {
  articleId: string;
  defaultValues?: Partial<ArticleDetailInput>;
  onDraftChange?: (draft: ArticleDetailInput) => void;
}

export const useArticleDetailForm = ({
  articleId,
  defaultValues,
  onDraftChange,
}: Props) => {
  const form = useForm<ArticleDetailInput, unknown, ArticleDetailOutput>({
    resolver: zodResolver(articleDetailSchema),
    mode: "onBlur",
    defaultValues: {
      articleId,
      sections: [
        {
          sectionType: "paragraph",
          content: "",
        },
      ],
      tags: "",
      relatedArticles: [],
      ...defaultValues,
      ...(defaultValues && { ...defaultValues, articleId }),
    },
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = form;

  const { field: relatedField } = useController({
    control,
    name: "relatedArticles",
  });
  const sectionArray = useFieldArray({ control, name: "sections" });
  const watchedSections = useWatch({ control, name: "sections" });

  const watchedValues = watch();

  useEffect(() => {
    onDraftChange?.(watchedValues);
  }, [JSON.stringify(watchedValues)]);

  return {
    form,
    control,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitted,
    relatedField,
    sectionArray,
    watchedSections,
  };
};
