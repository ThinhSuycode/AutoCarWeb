import classNames from "classnames/bind";
import styles from "./UsersManager.module.scss";
import UserTable from "./components/UserTable/UserTable";
import { useUsersManager } from "./hooks/useUsersManager";
import ModalLayout from "../../../components/ModalLayout/ModalLayout";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import PagePagination from "../../../components/PagePagination/PagePagination";
import UserDetailForm from "./components/UserDetailForm/UserDetailForm";
import UserForm from "./components/UserForm/UserForm";
import Header from "./components/Header/Header";

const cx = classNames.bind(styles);

const UsersManager = () => {
  const {
    usersData,
    pagination,
    page,
    setPage,
    setSearch,
    userDetail,
    isCreateFormOpen,
    confirmProps,
    onHandleClose,
    isLoading,
    handleDeleteUser,
    setIsCreateFormOpen,
    setUserDetail,
  } = useUsersManager();

  return (
    <>
      <ConfirmDialog {...confirmProps}></ConfirmDialog>
      <div className={cx("userManager-page")}>
        <ModalLayout
          showForm={userDetail.action === "view" || isCreateFormOpen}
          onClose={onHandleClose}
        >
          {userDetail.action === "view" && (
            <UserDetailForm
              data={userDetail?.userData}
              onCloseForm={onHandleClose}
              deleteAccount={() =>
                handleDeleteUser(userDetail.userData?._id || "")
              }
            ></UserDetailForm>
          )}
          {isCreateFormOpen && (
            <UserForm
              dataAllUser={usersData}
              onClose={() => setIsCreateFormOpen(false)}
            ></UserForm>
          )}
        </ModalLayout>

        <Header
          setIsCreateFormOpen={setIsCreateFormOpen}
          setSearch={setSearch}
        ></Header>

        <UserTable
          users={usersData}
          isLoading={isLoading}
          onUserAction={(data, action) => {
            if (action === "delete") {
              handleDeleteUser(data._id || "");
              return;
            }
            setUserDetail({
              userData: data,
              action: action,
            });
          }}
        ></UserTable>

        <PagePagination
          currentPage={page}
          totalPages={pagination?.totalPages ?? 0}
          total={pagination?.total ?? 0}
          limit={pagination?.limit ?? 8}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default UsersManager;
