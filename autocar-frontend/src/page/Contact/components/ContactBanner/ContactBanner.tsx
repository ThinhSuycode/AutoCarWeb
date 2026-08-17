import classNames from "classnames/bind";
import styles from "./ContactBanner.module.scss";
import type { BannerContact } from "../../../../types/contact/contact.ui";
import { BannerContactData } from "../../../../constants/contactShowroomData";

const cx = classNames.bind(styles);

const ContactBanner = () => {
  return (
    <div className={cx("contact-banner")}>
      <div className={cx("banner-top")}>
        <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <p>
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với
          AutoViet ngay hôm nay để nhận được sự tư vấn tận tình nhất.
        </p>
      </div>
      <div className={cx("banner-bottom")}>
        <div className={cx("list-item")}>
          {BannerContactData.map((item: BannerContact, idx: number) => (
            <div className={cx("item")} key={idx}>
              <div className={cx("icon")}>
                <i className={item.icon}></i>
              </div>
              <h4>{item.heading}</h4>
              <p>{item.desc.desc1}</p>
              <p>{item.desc.desc2}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
