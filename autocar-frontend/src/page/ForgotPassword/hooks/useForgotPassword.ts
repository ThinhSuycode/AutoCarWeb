// pages/ForgotPassword/hooks/useForgotPassword.ts

import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useForgotPasswordMutation from "../../../mutations/useForgotPasswordMutation";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../../../schemas/forgotPassword.schema";

const useForgotPassword = () => {
  const mutation = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await mutation.mutateAsync(data.email);

      toast.success(
        `Chúng tôi sẽ gửi liên kết đặt lại mật khẩu ngay tại ${data.email} của bạn!!`,
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Gửi yêu cầu thất bại");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitted,
    isLoading: mutation.isPending,
  };
};

export default useForgotPassword;
