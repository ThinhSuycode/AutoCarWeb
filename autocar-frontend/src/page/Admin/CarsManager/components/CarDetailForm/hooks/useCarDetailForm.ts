import toast from "react-hot-toast";
import {
  carDetailSchema,
  type CarDetailFormType,
} from "../../../../../../schemas/carDetail.schema";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CarDetailsType } from "../../../../../../types/car/car-detail.type";

interface Props {
  defaultValues: CarDetailFormType;
  carDetail: CarDetailsType | null;
}
export const useCarDetail = ({ defaultValues, carDetail }: Props) => {
  const [newFeature, setNewFeature] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<
    z.input<typeof carDetailSchema>,
    any,
    z.output<typeof carDetailSchema>
  >({
    resolver: zodResolver(carDetailSchema),
    defaultValues: defaultValues ?? null,
  });

  useEffect(() => {
    if (carDetail) {
      reset({
        carId: carDetail?.carId._id ?? "",
        location: carDetail?.location ?? "",
        images: carDetail?.images ?? [],
        description: carDetail?.description ?? "",
        features: carDetail?.features ?? [],
        specs: carDetail?.specs ?? [],
      });
    }
  }, [carDetail, reset]);

  const features = watch("features") || [];
  const specs = watch("specs") || [];
  const images = useWatch({
    control,
    name: "images",
    defaultValue: [],
  });

  const handleAddFeature = () => {
    const trimmed = newFeature.trim();

    if (!trimmed) return;

    setValue("features", [...features, trimmed]);

    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    setValue(
      "features",
      features.filter((_, i) => i !== index),
    );
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleAddSpecGroup = () => {
    setValue("specs", [
      ...specs,
      {
        title: "",
        items: [{ label: "", value: "" }],
      },
    ]);
  };

  const handleRemoveSpecGroup = (groupIndex: number) => {
    setValue(
      "specs",
      specs.filter((_, i) => i !== groupIndex),
    );
  };

  const handleSpecGroupTitleChange = (groupIndex: number, value: string) => {
    const updated = specs.map((group, i) =>
      i === groupIndex
        ? {
            ...group,
            title: value,
          }
        : group,
    );

    setValue("specs", updated);
  };

  const handleSpecItemChange = (
    groupIndex: number,
    itemIndex: number,
    field: "label" | "value",
    value: string,
  ) => {
    const updated = specs.map((group, gi) =>
      gi === groupIndex
        ? {
            ...group,
            items: group.items.map((item, ii) =>
              ii === itemIndex
                ? {
                    ...item,
                    [field]: value,
                  }
                : item,
            ),
          }
        : group,
    );

    setValue("specs", updated);
  };

  const handleAddSpecItem = (groupIndex: number) => {
    const updated = specs.map((group, gi) =>
      gi === groupIndex
        ? {
            ...group,
            items: [
              ...group.items,
              {
                label: "",
                value: "",
              },
            ],
          }
        : group,
    );

    setValue("specs", updated);
  };

  const handleRemoveSpecItem = (groupIndex: number, itemIndex: number) => {
    const updated = specs.map((group, gi) =>
      gi === groupIndex
        ? {
            ...group,
            items: group.items.filter((_, ii) => ii !== itemIndex),
          }
        : group,
    );

    setValue("specs", updated);
  };

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (!files.length) return;

    e.target.value = "";

    const formPayload = new FormData();

    files.forEach((file) => {
      formPayload.append("images", file);
    });

    setIsUploading(true);

    const toastId = toast.loading("Đang tải ảnh lên...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_KEYS}/upload/images`,
        {
          method: "POST",
          body: formPayload,
        },
      );

      if (!res.ok) {
        throw new Error();
      }

      const { urls }: { urls: string[] } = await res.json();

      setValue("images", [...images, ...urls], {
        shouldDirty: true,
        shouldValidate: true,
      });
      toast.success(`Đã tải lên ${urls.length} ảnh!`, {
        id: toastId,
      });
    } catch {
      toast.error("Tải ảnh thất bại!", {
        id: toastId,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,

    features,
    newFeature,
    setNewFeature,
    handleAddFeature,
    handleRemoveFeature,
    handleFeatureKeyDown,

    // specs
    specs,
    handleAddSpecGroup,
    handleRemoveSpecGroup,
    handleSpecGroupTitleChange,
    handleSpecItemChange,
    handleAddSpecItem,
    handleRemoveSpecItem,

    // images
    images,
    isUploading,
    fileInputRef,
    handleAddImages,

    control,
  };
};
