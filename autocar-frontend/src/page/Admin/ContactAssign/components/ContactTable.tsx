import classNames from "classnames/bind";
import styles from "../ContactAssign.module.scss";

import type { Contact } from "../../../../types/contact";
import type { UserType } from "../../../../types/users";

import { STATUS_ICON, STATUS_LABEL } from "../constants/contactManagerData";

const cx = classNames.bind(styles);

interface Props {
  contacts: Contact[];
  isLoading: boolean;
  isPending: boolean;
  staffData: UserType[];
  onAssignStaffContact: (id: string, managerId: string) => void;
}

const ContactTable = ({
  contacts,
  isLoading,
  isPending,
  staffData,
  onAssignStaffContact,
}: Props) => {
  return (
    <div className={cx("table-wrapper")}>
      <table className={cx("table")}>
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>SĐT</th>
            <th>Xe quan tâm</th>
            <th>Sale phụ trách</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Ghi chú</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td style={{ textAlign: "center" }} colSpan={7}>
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact._id}>
                <td>
                  <div className={cx("customer-cell")}>
                    <div className={cx("avatar")}>
                      {contact.name.charAt(0).toUpperCase()}
                    </div>

                    <span className={cx("name")}>{contact.name}</span>
                  </div>
                </td>

                <td>
                  <span className={cx("phone")}>
                    <i className="fa-solid fa-phone" />
                    {contact.phone}
                  </span>
                </td>

                <td>
                  {contact.carName ? (
                    <div className={cx("car-info")}>
                      <strong>{contact.carName}</strong>

                      {contact.carBrand && <small>{contact.carBrand}</small>}
                    </div>
                  ) : (
                    <span className={cx("no-car")}>Không có xe</span>
                  )}
                </td>

                <td>
                  <div className={cx("assign-cell")}>
                    <select
                      className={cx("select-staff")}
                      value={contact.managerId?._id || ""}
                      disabled={isPending}
                      onChange={(e) =>
                        onAssignStaffContact(contact._id, e.target.value)
                      }
                    >
                      <option value="">-- Huỷ phân bổ --</option>

                      {staffData.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.username}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>

                <td>
                  <span className={cx("status", contact.status)}>
                    <i className={`fa-solid ${STATUS_ICON[contact.status]}`} />

                    {STATUS_LABEL[contact.status] ?? contact.status}
                  </span>
                </td>

                <td>
                  {new Date(contact.createdAt).toLocaleDateString("vi-VN")}
                </td>

                <td>
                  <span className={cx("notes")} title={contact.notes}>
                    {contact.notes || "—"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {!isLoading && contacts.length === 0 && (
        <div className={cx("empty")}>
          <i className="fa-regular fa-folder-open" />
          <p>Không có yêu cầu liên hệ nào</p>
        </div>
      )}
    </div>
  );
};

export default ContactTable;
