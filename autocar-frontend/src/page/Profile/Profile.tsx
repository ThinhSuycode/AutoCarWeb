import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { changeApi } from "../../services/api";
import type { UserType } from "../../types/users";
import { Button } from "../../components/Button/Button";
import { getMeApi } from "../../services/auth.service";
import FormActive from "../../components/FormActive/FormActive";
import toast from "react-hot-toast";
import ModalLayout from "../../components/ModalLayout/ModalLayout";
import { config } from "../../config";

const cx = classNames.bind(styles);

interface INITIAL_INPUTTYPE {
  username: string;
  phone: string;
  address: string;
}

const INITIAL_INPUT: INITIAL_INPUTTYPE = {
  username: "",
  phone: "",
  address: "",
};

const fields: {
  label: string;
  name: keyof typeof INITIAL_INPUT;
  type: string;
}[] = [
  { label: "Họ và tên", name: "username", type: "text" },
  { label: "Số điện thoại", name: "phone", type: "text" },
  { label: "Địa chỉ", name: "address", type: "text" },
];

const Profile = () => {
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

  return (
    <div className={cx("profile-page")}>
      <ModalLayout showForm={showForm} onClose={() => setShowForm(false)}>
        <FormActive
          onClose={() => setShowForm(false)}
          onSuccess={onPasswordChanged}
        />
      </ModalLayout>

      <h2>Thông tin cá nhân</h2>
      <div className={cx("form-account")}>
        <div className={cx("account-info")}>
          <div className={cx("form-input")}>
            <label>Email</label>
            <input type="email" value={account?.email ?? ""} disabled />
          </div>

          {fields.map(({ label, name, type }) => (
            <div className={cx("form-input")} key={name}>
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={inputProfile[name]}
                onChange={onChangeInputProfile}
              />
            </div>
          ))}
        </div>

        <div className={cx("btn-send")}>
          <Button medium onClick={onHandleShowForm}>
            Đổi mật khẩu
          </Button>
          <Button
            iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
            medium
            onClick={onHandleSaveProfile}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
