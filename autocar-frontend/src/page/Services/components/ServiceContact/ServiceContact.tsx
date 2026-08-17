import classNames from "classnames/bind";
import styles from "./ServiceContact.module.scss";
import FormContact from "../../../../components/FormContact/FormContact";
import type { UserType } from "../../../../types/user/user.type";

const cx = classNames.bind(styles);

interface Props {
  userInfo: UserType | undefined | null;
}

const ServiceContact = ({ userInfo }: Props) => {
  return (
    <div className={cx("info-contact")}>
      <div className={cx("contact-form")}>
        <div className={cx("left")} data-aos="fade-right">
          <p className={cx("heading")}>Liên Hệ Với Chúng Tôi</p>

          <div className={cx("content")}>
            <h3>Bạn Cần Tư Vấn Thêm?</h3>

            <p>
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng giải đáp mọi thắc
              mắc.
            </p>
          </div>

          <div className={cx("card-list")}>
            <div className={cx("card-item")}>
              <div className={cx("card-icon")}>
                <i className="fa-solid fa-phone"></i>
              </div>

              <div className={cx("card-info")}>
                <p>Hotline tư vấn 24/7</p>
                <p>0869114177</p>
              </div>
            </div>

            <div className={cx("card-item")}>
              <div className={cx("card-icon")}>
                <i className="fa-solid fa-location"></i>
              </div>

              <div className={cx("card-info")}>
                <p>Địa chỉ showroom</p>
                <p>123 Nguyễn Văn Linh, Q.7, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("right")} data-aos="fade-left">
          <FormContact userInfo={userInfo}></FormContact>
        </div>
      </div>
    </div>
  );
};

export default ServiceContact;
