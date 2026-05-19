import classNames from "classnames/bind";
import styles from "./UsersManager.module.scss";
import UserTable from "./components/UserTable";
import { useUsersManager } from "./hooks/useUsersManager";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import ModalLayout from "../../../components/ModalLayout/ModalLayout";
import FormUser from "./components/FormUser";
import { useCallback, useState } from "react";
import type { UserType } from "../../../types/users";
import toast from "react-hot-toast";
import { changeApi } from "../../../services/api";
import { Button } from "../../../components/Button/Button";
import FormAdd from "./components/FormAdd";
import { useConfirm } from "../../../hooks/useConfirm";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";

const cx = classNames.bind(styles);
export interface GetDataProps {
  userData: UserType | null;
  message: string;
}
const UsersManager = () => {
  const { usersData, setSearch, pagination, onPageChange } = useUsersManager();
  const [userDetail, setUserDetail] = useState<GetDataProps>({
    userData: null,
    message: "",
  });
  const [addUser, setAddUser] = useState<boolean>(false);
  const { confirm, confirmProps } = useConfirm();
  const onHandleClose = useCallback(() => {
    setAddUser(false);
    setUserDetail({
      userData: null,
      message: "",
    });
  }, []);
  const handleDeleteAccount = useCallback(
    async (userId: string) => {
      const ok = await confirm({
        title: "Xoá người dùng!!",
        message: `Bạn có muốn xoá người dùng ${userId} này không?`,
        confirmText: "Xác nhận",
        cancelText: "Huỷ",
      });
      if (!ok) return;

      try {
        await changeApi.request<UserType>("users", "delete", undefined, userId);
        toast.success("Xoá thành công dữ liệu người dùng!");
        onHandleClose();
        onPageChange(1);
      } catch (error: any) {
        const msg =
          error?.response?.data?.message || "Xoá người dùng không thành công!";
        toast.error(msg);
      }
    },
    [confirm, onHandleClose, onPageChange],
  );

  return (
    <>
      <ConfirmDialog {...confirmProps}></ConfirmDialog>
      <div className={cx("userManager-page")}>
        <ModalLayout
          showForm={userDetail.message === "show" || addUser}
          onClose={onHandleClose}
        >
          {userDetail.message === "show" && (
            <FormUser
              data={userDetail?.userData}
              onClose={onHandleClose}
              deleteAccount={() =>
                handleDeleteAccount(userDetail.userData?._id || "")
              }
            ></FormUser>
          )}
          {addUser && (
            <FormAdd
              dataAllUser={usersData}
              onClose={() => setAddUser(false)}
            ></FormAdd>
          )}
        </ModalLayout>
        <div className={cx("header")}>
          <h2>Quản lý người dùng</h2>
          <div className={cx("form-actions")}>
            <Search onSearch={setSearch}></Search>
            <Button onClick={() => setAddUser(true)}>
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
        </div>
        <div className={cx("content")}>
          <UserTable
            users={usersData}
            getData={(data, mess) => {
              if (mess === "delete") {
                handleDeleteAccount(data._id || "");
                return;
              }
              setUserDetail({
                userData: data,
                message: mess,
              });
            }}
          ></UserTable>
        </div>
        <Pagination
          pagination={pagination}
          onPageChange={onPageChange}
        ></Pagination>
      </div>
    </>
  );
};

export default UsersManager;
