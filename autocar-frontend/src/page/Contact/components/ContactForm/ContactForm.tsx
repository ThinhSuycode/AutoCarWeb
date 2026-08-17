import classNames from "classnames/bind";
import styles from "./ContactForm.module.scss";
import FormContact from "../../../../components/FormContact/FormContact";
import type { UserType } from "../../../../types/user/user.type";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../constant/contactData";

const cx = classNames.bind(styles);

interface Props {
  userInfo: UserType | null;
}

const ContactForm = ({ userInfo }: Props) => {
  return (
    <div className={cx("contact-wrapper")}>
      <div className={cx("form-content")}>
        <div className={cx("form-heading")}>
          <h3>Gửi Tin Nhắn</h3>
          <p>
            Điền thông tin vào biểu mẫu bên dưới, đội ngũ tư vấn của chúng tôi
            sẽ liên hệ lại với bạn trong thời gian sớm nhất.
          </p>
        </div>
        <FormContact userInfo={userInfo}></FormContact>
      </div>

      <div className={cx("contact-info-card")}>
        <div className={cx("info-heading")}>
          <span className={cx("info-heading-icon")}>
            <i className="fa-solid fa-headset" />
          </span>
          <div>
            <h3>Thông tin liên hệ</h3>
            <p>Đội ngũ AutoCarWeb luôn sẵn sàng hỗ trợ bạn</p>
          </div>
        </div>

        <div className={cx("info-grid")}>
          {CONTACT_INFO.map((item) =>
            item.href ? (
              <a key={item.label} href={item.href} className={cx("info-tile")}>
                <span className={cx("tile-icon")}>
                  <i className={item.icon} />
                </span>
                <span className={cx("tile-label")}>{item.label}</span>
                <span className={cx("tile-value")}>{item.value}</span>
              </a>
            ) : (
              <div key={item.label} className={cx("info-tile")}>
                <span className={cx("tile-icon")}>
                  <i className={item.icon} />
                </span>
                <span className={cx("tile-label")}>{item.label}</span>
                <span className={cx("tile-value")}>{item.value}</span>
              </div>
            ),
          )}
        </div>

        <div className={cx("info-social")}>
          <span className={cx("social-label")}>Kết nối với chúng tôi</span>

          <div className={cx("social-links")}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className={cx("social-btn")}
              >
                <i className={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
