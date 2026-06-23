import classNames from "classnames/bind";
import styles from "../MyContact.module.scss";

import type { Contact } from "../../../../types/contact";
import { STATUS_ICON } from "../../../Admin/ContactAssign/constants/contactManagerData";
import { MAP_STATUS_DATA, STATUS_LABEL } from "../constants/statusLabelData";
import type { ContactStatus } from "../../../../mutations/useUpdateContactStatus";

const cx = classNames.bind(styles);

interface Props {
  contacts: Contact[];
  isLoading: boolean;
  isUpdating: boolean;

  updateStatus: (payload: {
    id: string;
    status: ContactStatus;
  }) => Promise<any>;

  onShowContact:(data:Contact|null)=>void;
}

const MyContactTable = ({
  contacts,
  isLoading,
  isUpdating,
  updateStatus,
  onShowContact
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
                      value={contact.status || ""}
                      disabled={isUpdating}
                      onChange={(e) =>
                        updateStatus({
                          id: contact._id,
                          status: e.target.value as ContactStatus,
                        })
                      }
                    >
                      {MAP_STATUS_DATA.map((item) => (
                        <option key={item} value={item}>
                          {STATUS_LABEL[item]}
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
                  <div className={cx("show-contact")} onClick={()=>onShowContact(contact)}>
                    <i className="fa-regular fa-eye"></i>
                  </div>
                  {/* <textarea className={cx("notes")} title={contact.notes}>
                    {contact.message || "—"}
                  </textarea> */}
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

export default MyContactTable;
