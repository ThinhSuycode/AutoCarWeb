import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../../../schemas/resetPassword.schema";
import useResetPasswordMutation from "../../../mutations/useResetPasswordMutation";
import { useState } from "react";
import { config } from "../../../config";

const useResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const mutation = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordLength = watch("password").length > 0;
  const confirmPasswordLength = watch("confirmPassword").length > 0;

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await mutation.mutateAsync({
        token,
        password: data.password,
      });

      toast.success("Đổi mật khẩu thành công");

      navigate(config.Routes.Login);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Đổi mật khẩu thất bại");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitted,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordLength,
    confirmPasswordLength,

    isLoading: mutation.isPending,
  };
};

export default useResetPassword;
