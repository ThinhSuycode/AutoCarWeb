import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { UserType } from "../../../types/users";
import { changeApi } from "../../../services/api";
import { config } from "../../../config";
import { getMeApi } from "../../../services/auth.service";

export interface INITIAL_INPUTTYPE {
  username: string;
  phone: string;
  address: string;
}

export const INITIAL_INPUT: INITIAL_INPUTTYPE = {
  username: "",
  phone: "",
  address: "",
};
export interface FieldType {
  label: string;
  name: keyof INITIAL_INPUTTYPE;
  type: string;
}

export const fields: FieldType[] = [
  { label: "Họ và tên", name: "username", type: "text" },
  { label: "Số điện thoại", name: "phone", type: "text" },
  { label: "Địa chỉ", name: "address", type: "text" },
];

const useProfile = () => {
  const [account, setAccount] = useState<UserType | null>(null);
  const [inputProfile, setInputProfile] =
    useState<INITIAL_INPUTTYPE>(INITIAL_INPUT);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const isLogin = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isLogin) return;
    const fetchInfoAccount = async () => {
      try {
        const data = await getMeApi();
        setAccount(data);
      } catch {
        localStorage.removeItem("token");
        setAccount(null);
        toast.error("Phiên đăng nhập đã hết hạn!");
      }
    };
    fetchInfoAccount();
  }, [isLogin]);

  useEffect(() => {
    if (!account) return;
    setInputProfile({
      username: account.username ?? "",
      phone: account.phone ?? "",
      address: account.address ?? "",
    });
  }, [account]);

  const onChangeInputProfile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputProfile((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const onHandleSaveProfile = useCallback(async () => {
    const userId = account?._id;
    if (!userId) {
      toast.error("Không tìm thấy thông tin tài khoản!");
      return;
    }

    if (!inputProfile.username.trim()) {
      toast.error("Vui lòng nhập họ và tên!");
      return;
    }
    if (!inputProfile.phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại!");
      return;
    }

    setLoading(true);

    try {
      const safeUpdate = {
        username: inputProfile.username.trim(),
        phone: inputProfile.phone.trim(),
        address: inputProfile.address.trim(),
      };

      const result = await changeApi.request<UserType>(
        `users/${userId}`,
        "patch",
        safeUpdate,
      );

      if (result) {
        toast.success("Cập nhật thông tin thành công!");
        setAccount((prev) => (prev ? { ...prev, ...safeUpdate } : prev));
        setTimeout(() => {
          window.location.href = config.Routes.Profile;
        }, 500);
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  }, [account, inputProfile]);

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
    // state
    account,
    inputProfile,
    loading,
    showForm,
    isLogin,

    // constants
    fields,

    // actions
    onChangeInputProfile,
    onHandleSaveProfile,
    onHandleShowForm,
    onPasswordChanged,

    // setters nếu cần
    setShowForm,
  };
};

export default useProfile;
