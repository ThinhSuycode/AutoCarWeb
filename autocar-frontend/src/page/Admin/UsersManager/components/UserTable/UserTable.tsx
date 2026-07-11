import classNames from "classnames/bind";
import styles from "./UserTable.module.scss";
import type { UserType } from "../../../../../types/users";
import type { UserAction } from "../../types/usersManager.type";
import EmptyData from "../../../../../components/EmtyData/EmptyData";

const cx = classNames.bind(styles);

interface Props {
  users: UserType[] | null;
  onUserAction: (userData: UserType, action: UserAction) => void;
}

const UserTable = ({ users, onUserAction }: Props) => {
  if (!users) return <EmptyData></EmptyData>;
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
            {users?.length === 0 ? (
              <tr>
                <td colSpan={5} className={cx("empty")}>
                  Không có dữ liệu
                </td>
              </tr>
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
                        <p className={cx("user-name")}>{user.email}</p>
                        <span className={cx("user-id")}>{user.username}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className={cx("role")}>{user.role}</td>

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
