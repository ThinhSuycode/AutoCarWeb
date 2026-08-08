import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  carFormSchema,
  type CreateCarDto,
} from "../../../../../../schemas/car.schema";

type Props = {
  defaultValues?: Partial<CreateCarDto>;
};

export const useCarForm = ({ defaultValues }: Props) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<
    z.input<typeof carFormSchema>,
    any,
    z.output<typeof carFormSchema>
  >({
    resolver: zodResolver(carFormSchema),
    defaultValues,
  });

  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    e.target.value = "";

    const formData = new FormData();

    formData.append("images", file);

    setIsUploading(true);

    const toastId = toast.loading("Đang tải ảnh...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_KEYS}/upload/images`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error();

      const { urls }: { urls: string[] } = await res.json();

      setValue("thumbnail", urls[0], {
        shouldValidate: true,
      });

      toast.success("Tải ảnh thành công", {
        id: toastId,
      });
    } catch {
      toast.error("Tải ảnh thất bại", {
        id: toastId,
      });
    } finally {
      setIsUploading(false);
    }
  };
  return {
    handleSubmit,
    register,
    errors,
    handleUploadImage,
    isUploading,
    watch,
    fileInputRef,
  };
};
