import classNames from "classnames/bind";
import styles from "../MyContact.module.scss";

import type { Contact } from "../../../../types/contact";
import { STATUS_LABEL } from "../constants/statusLabelData";

const cx = classNames.bind(styles);

interface Props {
  contact: Contact | null;
  onClose: () => void;
}

const FormContactDetail = ({ contact, onClose }: Props) => {
  if (!contact) return null;

  return (
    <div className={cx("modal-overlay")} onClick={onClose}>
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("modal-header")}>
          <div className={cx("header-title")}>
            <div className={cx("icon-wrapper")}>
              <i className="fa-regular fa-address-card" />
            </div>
            <div>
              <h3>Chi tiết khách hàng</h3>
              <p>Mã LH: #{contact._id?.slice(-6).toUpperCase() || "N/A"}</p>
            </div>
          </div>

          <button type="button" className={cx("close-btn")} onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className={cx("modal-body")}>
          <div className={cx("detail-grid")}>
            <div className={cx("field")}>
              <label>
                <i className="fa-regular fa-user" /> Họ tên
              </label>
              <p>{contact.name}</p>
            </div>

            <div className={cx("field")}>
              <label>
                <i className="fa-solid fa-phone-volume" /> Số điện thoại
              </label>
              <p className={cx("highlight")}>{contact.phone}</p>
            </div>

            <div className={cx("field")}>
              <label>
                <i className="fa-solid fa-car-side" /> Xe quan tâm
              </label>
              <p>{contact.carName || "Không có"}</p>
            </div>

            <div className={cx("field")}>
              <label>
                <i className="fa-solid fa-tag" /> Hãng xe
              </label>
              <p>{contact.carBrand || "Không có"}</p>
            </div>

            <div className={cx("field")}>
              <label>
                <i className="fa-solid fa-chart-pie" /> Trạng thái
              </label>
              <div>
                <span className={cx("status", contact.status)}>
                  {STATUS_LABEL[contact.status]}
                </span>
              </div>
            </div>

            <div className={cx("field")}>
              <label>
                <i className="fa-solid fa-user-tie" /> Sale phụ trách
              </label>
              <p>{contact.managerId?.username || "Chưa phân công"}</p>
            </div>

            {/* Row Full width */}
            <div className={cx("field")}>
              <label>
                <i className="fa-regular fa-calendar" /> Ngày tạo
              </label>
              <p>{new Date(contact.createdAt).toLocaleString("vi-VN")}</p>
            </div>

            <div className={cx("field")}>
              <label>
                <i className="fa-regular fa-clipboard" /> Ghi chú nội bộ
              </label>
              <p>{contact.notes || "Không có ghi chú"}</p>
            </div>

            <div className={cx("field", "full-width")}>
              <label>
                <i className="fa-regular fa-comment-dots" /> Lời nhắn từ khách
                hàng
              </label>
              <textarea
                readOnly
                value={contact.message || "Khách hàng không để lại lời nhắn..."}
              />
            </div>
          </div>
        </div>

        <div className={cx("modal-footer")}>
          <button className={cx("btn-close")} onClick={onClose}>
            Đóng thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormContactDetail;
