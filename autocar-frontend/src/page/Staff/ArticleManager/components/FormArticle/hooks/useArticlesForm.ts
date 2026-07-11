import { useEffect, useMemo, useState } from "react";
import { createSlug } from "../../../../../../utils/slug";
import { STAFF_STATUS_ARTICILE } from "../../../constants/statusMapData";
import {
  articleFormSchema,
  type ArticleFormInput,
  type ArticleFormOutput,
} from "../schema/article.schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  mode: "create" | "update";
  defaultValues?: Partial<ArticleFormInput>;
  onDraftChange?: (draft: Partial<ArticleFormInput>) => void;
}

export const useArticlesForm = ({
  mode,
  defaultValues,
  onDraftChange,
}: Props) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormInput, unknown, ArticleFormOutput>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      status: "draft",
      readTime: "5 phút",
      ...defaultValues,
    },
  });

  const title = watch("title");
  const slug = watch("slug");
  const status = watch("status");
  const thumbnail = watch("thumbnail");

  // Theo dõi toàn bộ form để lưu draft
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (watchedValues) {
      onDraftChange?.(watchedValues);
    }
  }, [watchedValues, onDraftChange]);

  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    setPreviewError(false);
  }, [thumbnail]);

  const statusOptions = useMemo(() => {
    return status === "published" ? ["published"] : STAFF_STATUS_ARTICILE;
  }, [status]);

  useEffect(() => {
    if (mode !== "create") return;
    if (!title?.trim()) return;

    setValue("slug", createSlug(title), {
      shouldValidate: false,
    });
  }, [title, mode, setValue]);

  return {
    previewError,
    register,
    handleSubmit,
    slug,
    statusOptions,
    errors,
    thumbnail,
    setPreviewError,
  };
};
