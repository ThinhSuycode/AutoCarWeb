import classNames from "classnames/bind";
import styles from "./MyContactTable.module.scss";
import { STATUS_ICON } from "../../../../Admin/ContactAssign/constants/contactManagerData";
import {
  STATUS_LABEL,
  type STAFF_STATUS_CONTACT,
} from "../../constants/statusLabelData";
import { NEXT_STATUS } from "../../constants/contactWorkflow";
import EmptyState from "../../../../../components/EmtyState/EmptyState";
import LoadingData from "../../../../../components/LoadingData/LoadingData";
import type { Contact } from "../../../../../types/contact/contact.type";

const cx = classNames.bind(styles);

interface Props {
  contacts: Contact[];
  isLoading: boolean;
  isUpdating: boolean;

  updateStatus: (payload: {
    id: string;
    status: STAFF_STATUS_CONTACT;
  }) => Promise<Contact>;

  onShowContact: (data: Contact | undefined) => void;
}

const MyContactTable = ({
  contacts,
  isLoading,
  isUpdating,
  updateStatus,
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
            <th>Cập nhật trạng thái</th>
            <th>Trạng thái hiện tại</th>
            <th>Ngày tạo</th>
            <th>Chi tiết</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7}>
                <LoadingData message="Đang tải..."></LoadingData>
              </td>
            </tr>
          ) : contacts.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <EmptyState type="contacts"></EmptyState>
              </td>
            </tr>
          ) : (
            contacts.map((contact) => {
              const availableStatuses = NEXT_STATUS[contact.status] ?? [];
              return (
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
                        value=""
                        disabled={isUpdating || availableStatuses.length === 0}
                        onChange={(e) =>
                          updateStatus({
                            id: contact._id,
                            status: e.target.value as STAFF_STATUS_CONTACT,
                          })
                        }
                      >
                        <option value="">Chọn hành động</option>

                        {availableStatuses.map((status) => (
                          <option key={status} value={status}>
                            {STATUS_LABEL[status]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td>
                    <span className={cx("status", contact.status)}>
                      <i
                        className={`fa-solid ${STATUS_ICON[contact.status]}`}
                      />

                      {STATUS_LABEL[contact.status] ?? contact.status}
                    </span>
                  </td>

                  <td>
                    {new Date(contact.createdAt).toLocaleDateString("vi-VN")}
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
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyContactTable;
