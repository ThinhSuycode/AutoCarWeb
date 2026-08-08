import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { changePasswordApi } from "../../../services/auth.service";
import {
  changePasswordSchema,
  type ChangePasswordInput,
  type ChangePasswordOutput,
} from "../../../schemas/user.schema";

interface Props {
  onSuccess?: () => void;
}

const useChangePassword = ({ onSuccess }: Props) => {
  const [showPass, setShowPass] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordInput, Error, ChangePasswordOutput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const toggleShowPass = useCallback((name: keyof typeof showPass) => {
    setShowPass((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  const onSubmit = useCallback(
    async (data: ChangePasswordOutput) => {
      try {
        await changePasswordApi({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
        reset();
        onSuccess?.();
      } catch (err: any) {
        toast.error(err?.response?.data?.message ?? "Đổi mật khẩu thất bại");
      }
    },
    [reset, onSuccess],
  );

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showPass,

    onSubmit,
    toggleShowPass,
  };
};

export default useChangePassword;
