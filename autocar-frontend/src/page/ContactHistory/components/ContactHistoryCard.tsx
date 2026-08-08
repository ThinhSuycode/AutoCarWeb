import classNames from "classnames/bind";
import styles from "../ContactHistory.module.scss";
import { CONTACT_STATUS_MAP } from "../constant/contactHistoryData";
import { formatDateToString } from "../../../hooks/formatDate";
import type { Contact } from "../../../types/contact/contact.type";
import type { ContactStatus } from "../../../types/contact/contact.constant";

const cx = classNames.bind(styles);

interface Props {
  contact: Contact;
}

const ContactHistoryCard = ({ contact }: Props) => {
  const statusInfo =
    CONTACT_STATUS_MAP[contact.status as ContactStatus] ??
    CONTACT_STATUS_MAP.new;

  return (
    <div className={cx("history-card")}>
      {/* Status stripe */}
      <div className={cx("card-stripe", contact.status)} />

      <div className={cx("card-body")}>
        {/* Header: xe + badge status */}
        <div className={cx("card-header")}>
          <div className={cx("car-block")}>
            <i className="fa-solid fa-car"></i>
            <div>
              <p className={cx("car-name")}>
                {contact.carName || "Liên hệ chung"}
              </p>
              {contact.carBrand && (
                <span className={cx("car-brand")}>{contact.carBrand}</span>
              )}
            </div>
          </div>

          <span className={cx("status-badge", contact.status)}>
            <i className={`fa-solid ${statusInfo.icon}`}></i>
            {statusInfo.label}
          </span>
        </div>

        {/* Message */}
        {contact.message && (
          <p className={cx("message")}>
            <i className="fa-regular fa-comment"></i>
            {contact.message}
          </p>
        )}

        {/* Footer: staff phụ trách + ngày */}
        <div className={cx("card-footer")}>
          <div className={cx("staff-info")}>
            {contact.managerId ? (
              <>
                <div className={cx("staff-avatar")}>
                  {(contact.managerId.username ?? "").charAt(0).toUpperCase()}
                </div>
                <span className={cx("staff-name")}>
                  {contact.managerId.username}
                </span>
                <span className={cx("staff-role")}>phụ trách</span>
              </>
            ) : (
              <span className={cx("no-staff")}>
                <i className="fa-solid fa-user-clock"></i>
                Chờ phân công
              </span>
            )}
          </div>

          <span className={cx("date")}>
            <i className="fa-regular fa-calendar"></i>
            {formatDateToString(contact.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactHistoryCard;
