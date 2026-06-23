import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { config } from "../../../config";
import { useLoginMutation } from "../../../mutations/useLoginMutation";
import { loginWithGoogleApi } from "../../../services/auth.service";
import { loginSchema, type LoginFormData } from "../../../schemas/auth.schema";

export const useLogin = () => {
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const [passwordShow, setPasswordShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onHandlePasswordActive = useCallback(() => {
    setPasswordShow((prev) => !prev);
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);

      toast.success("Đăng nhập thành công");

      navigate(config.Routes.Home);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Đăng nhập thất bại");
    }
  };

  const handleGoogleLogin = useCallback(
    async (credentialResponse: any) => {
      try {
        const credential = credentialResponse?.credential;

        if (!credential) {
          toast.error("Đăng nhập Google thất bại!");
          return;
        }

        const res = await loginWithGoogleApi(credential);

        localStorage.setItem("token", res.token);

        toast.success("Đăng nhập Google thành công!");

        navigate(config.Routes.Home);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message ?? "Đăng nhập Google thất bại!",
        );
      }
    },
    [navigate],
  );

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitted,
    passwordShow,
    onHandlePasswordActive,
    passwordShowLength: watch("password")?.length > 0,
    isLoading: loginMutation.isPending,
    handleGoogleLogin,
  };
};
