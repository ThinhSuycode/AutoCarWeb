import classNames from "classnames/bind";
import styles from "./UserTable.module.scss";
import type { UserAction } from "../../types/usersManager.type";
import EmptyState from "../../../../../components/EmtyState/EmptyState";
import LoadingData from "../../../../../components/LoadingData/LoadingData";
import type { UserType } from "../../../../../types/user/user.type";

const cx = classNames.bind(styles);

interface Props {
  users: UserType[] | null;
  isLoading: boolean;
  onUserAction: (userData: UserType, action: UserAction) => void;
}

const UserTable = ({ users, onUserAction, isLoading }: Props) => {
  return (
    <div className={cx("content")}>
      <div className={cx("table-wrapper")}>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Thông tin người dùng</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Chi tiết</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <LoadingData message="Đang tải..."></LoadingData>
                </td>
              </tr>
            ) : users?.length === 0 ? (
              <td colSpan={5}>
                <EmptyState type="users"></EmptyState>
              </td>
            ) : (
              users?.map((user) => (
                <tr key={user._id} className={cx("row")}>
                  <td>
                    <div className={cx("info-detail")}>
                      {user.avatar && (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className={cx("user-img")}
                        />
                      )}
                      <div>
                        <p className={cx("user-name")}>{user.username}</p>
                        <span className={cx("user-id")}>{user._id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <div className={cx("role", user.role)}>{user.role}</div>
                  </td>

                  <td>
                    <button
                      className={cx("show-detail")}
                      onClick={() => onUserAction(user, "view")}
                    >
                      <i className="fa-regular fa-eye"></i>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => onUserAction(user, "delete")}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
