import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  updateUserSchema,
  type UpdateUserInput,
} from "../../../../../../schemas/user.schema";
import { useUpdateAvatar } from "../mutations/useUpdateAvatar";
import { useUpdateUser } from "../mutations/useUpdateUser";
import type { UserType } from "../../../../../../types/user/user.type";

const DEFAULT_AVATAR =
  "https://www.pngall.com/wp-content/uploads/15/User-PNG-Photos.png";

interface UseUserDetailFormProps {
  data?: UserType | null;
  onCloseForm?: () => void;
}

export const useUserDetailForm = ({
  data,
  onCloseForm,
}: UseUserDetailFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);
  const { updateUserMutation } = useUpdateUser();
  const { updateAvatarMutation } = useUpdateAvatar();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: data?.username ?? "",
      password: "",
      role: data?.role ?? "user",
      phone: data?.phone ?? "",
      address: data?.address ?? "",
      avatar: data?.avatar ?? DEFAULT_AVATAR,
    },
  });

  const avatarPreview = watch("avatar");

  const handleAvatarUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận ảnh JPG, PNG, WEBP!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ảnh không được vượt quá 2MB!");
        return;
      }

      setPendingAvatarFile(file);
      setAvatarRemoved(false);

      const reader = new FileReader();
      reader.onload = (ev) => {
        setValue("avatar", ev.target?.result as string, {
          shouldDirty: true,
        });
      };
      reader.readAsDataURL(file);
    },
    [setValue],
  );

  const handleRemoveAvatar = useCallback(() => {
    setValue("avatar", "", { shouldDirty: true });
    setPendingAvatarFile(null);
    setAvatarRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [setValue]);

  const onHandleSave = useCallback(
    async (formValues: UpdateUserInput) => {
      const trimmedPassword = formValues.password?.trim() ?? "";

      if (trimmedPassword.length >= 1 && trimmedPassword.length < 8) {
        toast.error("Mật khẩu phải có ít nhất 8 ký tự!!");
        return;
      }

      const hasChanges =
        formValues.username !== data?.username ||
        formValues.address !== data?.address ||
        formValues.phone !== data?.phone ||
        formValues.role !== data?.role ||
        trimmedPassword.length >= 8 ||
        pendingAvatarFile !== null ||
        avatarRemoved;

      if (!hasChanges) {
        toast("Không có thay đổi nào để lưu.", { icon: "ℹ️" });
        return;
      }

      if (!data?._id) {
        toast.error("Không tìm thấy người dùng!");
        return;
      }

      setIsUploading(true);
      try {
        if (pendingAvatarFile) {
          const newAvatarUrl = await updateAvatarMutation({
            userId: data._id,
            avatar: pendingAvatarFile,
          });
          setValue("avatar", newAvatarUrl || DEFAULT_AVATAR);
          setPendingAvatarFile(null);
        } else if (avatarRemoved) {
          await updateUserMutation({
            userId: data._id,
            data: {
              avatar: DEFAULT_AVATAR,
            },
          });
          setAvatarRemoved(false);
        }

        const payload: UpdateUserInput = {
          username: formValues.username,
          address: formValues.address,
          phone: formValues.phone,
          role: formValues.role,
          ...(trimmedPassword.length >= 8 && {
            password: trimmedPassword,
          }),
        };

        await updateUserMutation({ userId: data._id, data: payload });
        toast.success("Cập nhật thông tin thành công");
        onCloseForm?.();
      } catch {
        toast.error("Lỗi khi cập nhật dữ liệu!!");
      } finally {
        setIsUploading(false);
      }
    },
    [
      data,
      onCloseForm,
      pendingAvatarFile,
      avatarRemoved,
      setValue,
      updateAvatarMutation,
    ],
  );

  return {
    register,
    handleSubmit: handleSubmit(onHandleSave),
    reset,
    watch,
    setValue,
    errors,
    fileInputRef,
    isUploading,
    avatarPreview,
    handleAvatarUpload,
    handleRemoveAvatar,
  };
};
