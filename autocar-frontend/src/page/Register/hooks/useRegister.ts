import toast from "react-hot-toast";
import { config } from "../../../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type FormRegisterSchemaType,
} from "../../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegisterMutation from "../../../mutations/useRegisterMutation";

const useRegister = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitted },
    handleSubmit,
    watch,
  } = useForm<FormRegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const registerMutation = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordLength = watch("password").length > 0;
  const confirmPasswordLength = watch("confirmPassword").length > 0;

  const onSubmit = async (data: FormRegisterSchemaType) => {
    try {
      const { confirmPassword, ...payload } = data;
      await registerMutation.mutateAsync(payload);

      toast.success("Đăng ký thành công!");

      navigate(config.Routes.Login);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Đăng ký thất bại");
    }
  };

  return {
    onSubmit,
    handleSubmit,
    errors,
    isSubmitted,
    register,
    watch,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordLength,
    confirmPasswordLength,
  };
};

export default useRegister;
