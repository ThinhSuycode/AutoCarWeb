import classNames from "classnames/bind";
import styles from "../ContactAssign.module.scss";
import { STATUS_ICON, STATUS_LABEL } from "../constants/contactManagerData";
import LoadingData from "../../../../components/LoadingData/LoadingData";
import EmptyState from "../../../../components/EmtyState/EmptyState";
import type { Contact } from "../../../../types/contact/contact.type";
import type { UserType } from "../../../../types/user/user.type";

const cx = classNames.bind(styles);

interface Props {
  contacts: Contact[];
  isLoading: boolean;
  isPending: boolean;
  staffData: UserType[];
  onAssignStaffContact: (id: string, managerId: string) => void;
  onShowContact: (contact: Contact | undefined) => void;
}

const ContactTable = ({
  contacts,
  isLoading,
  isPending,
  staffData,
  onAssignStaffContact,
  onShowContact,
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
            <th>Chi tiết</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={8}>
                <LoadingData message="Đang tải..."></LoadingData>
              </td>
            </tr>
          ) : contacts.length === 0 ? (
            <tr>
              <td colSpan={8}>
                <EmptyState type="contacts"></EmptyState>
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
                <td>
                  <div
                    className={cx("show-contact")}
                    onClick={() => onShowContact(contact)}
                  >
                    <i className="fa-regular fa-eye"></i>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
