import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { callApi, changeApi } from "../../services/api";
import Button from "../../components/Button/Button";
import type { CustomerType } from "../../types/customer";

const cx = classNames.bind(styles);
const Profile = () => {
  const [emailActive] = useState<string>(() => {
    const email = localStorage.getItem("accountActive");
    return email ? JSON.parse(email) : "";
  });
  const [account, setAccount] = useState<CustomerType | null>(null);
  const [inputProfile, setInputProfile] = useState<CustomerType>({
    username: account?.username,
    email: account?.email,
    phone: account?.phone,
    address: account?.address,
    password: account?.password,
  });
  console.log(inputProfile);
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        if (!emailActive) return;
        const data = await callApi.getData("customer");
        if (data && Array.isArray(data)) {
          const filterAccount = data.find(
            (acc: CustomerType) => acc.email === emailActive,
          );
          setAccount(filterAccount);
          setInputProfile({
            username: filterAccount.username ?? "",
            email: filterAccount.email ?? "",
            phone: filterAccount.phone ?? "",
            address: filterAccount.address ?? "",
            password: filterAccount.password ?? "",
          });
        }
      } catch (error) {
        console.log("Fetch data fail ", error);
      }
    };
    fetchAccountData();
  }, [emailActive]);
  const ChangeInputProfile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );
  const onHandleSaveProfile = useCallback(async () => {
    if (!account?.id) return;
    try {
      const updatedCustomer: CustomerType = {
        ...account,
        ...inputProfile,
      };
      const result = await changeApi.getData(
        `customer/${account.id}`,
        "update",
        updatedCustomer,
      );
      if (result) {
        alert("Cập nhật thông tin thành công!!");
      } else {
        alert("Cập nhật thất bại !!");
        return;
      }
    } catch (error) {
      console.log("Update failed data " + error);
    }
  }, [account, inputProfile]);
  return (
    <div className={cx("profile-page")}>
      <h2>Thông tin cá nhân</h2>
      <div className={cx("form-account")}>
        <div className={cx("account-info")}>
          <div className={cx("form-input")}>
            <label htmlFor="">Họ và tên</label>
            <input
              type="text"
              name="username"
              value={inputProfile.username}
              onChange={ChangeInputProfile}
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={inputProfile.phone}
              onChange={ChangeInputProfile}
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              value={inputProfile.email}
              onChange={ChangeInputProfile}
            />
          </div>
          <div className={cx("form-input")}>
            <label htmlFor="">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={inputProfile.address}
              onChange={ChangeInputProfile}
            />
          </div>
        </div>
        <div className={cx("btn-send")}>
          <Button
            iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
            onClick={onHandleSaveProfile}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
