import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  userBaseSchema,
  type FormInputProfile,
  type FormOutputProfile,
} from "../../../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSaveProfile from "../mutations/useSaveProfile";
import { useCurrentUser } from "../../../queries/useCurrentUser";

const useProfile = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const isLogin = !!localStorage.getItem("token");
  const { data: account } = useCurrentUser(isLogin);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormInputProfile, Error, FormOutputProfile>({
    resolver: zodResolver(userBaseSchema),
    defaultValues: {
      email: account?.email ?? "",
      username: account?.username ?? "",
      address: account?.address ?? "",
      phone: account?.phone ?? "",
    },
  });

  const { mutateAsync: updateProfileMutation, isPending } = useSaveProfile();

  const handleSaveProfile = useCallback(
    async (data: FormInputProfile) => {
      try {
        await updateProfileMutation({ id: account?._id, data });
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Lỗi cập nhật dữ liệu!!";
        toast.error(message);
      }
    },
    [account],
  );

  const onHandleShowForm = useCallback(() => {
    if (!account) {
      toast.error("Vui lòng đăng nhập!");
      return;
    }
    setShowForm(true);
  }, [account]);

  const onPasswordChanged = useCallback(() => {
    setShowForm(false);
    toast.success("Đổi mật khẩu thành công!");
  }, []);
  return {
    account,
    register,
    handleSubmit,
    isLoading: isPending,
    showForm,
    isLogin,
    watch,
    errors,

    // actions
    handleSaveProfile,
    onHandleShowForm,
    onPasswordChanged,
    // setters nếu cần
    setShowForm,
    isSubmitted,
  };
};

export default useProfile;
