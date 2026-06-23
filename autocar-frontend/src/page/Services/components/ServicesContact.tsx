import classNames from "classnames/bind";
import styles from "../Services.module.scss";
import { Button } from "../../../components/Button/Button";

const cx = classNames.bind(styles);

const ServiceContact = () => {
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
          <h4>Liên Hệ Người Bán</h4>

          <p>Để lại thông tin để được tư vấn chi tiết và đặt lịch xem xe.</p>

          <div className={cx("form-inner")}>
            <div className={cx("input-form")}>
              <p>Họ và tên</p>
              <input type="text" />
            </div>

            <div className={cx("input-form")}>
              <p>Số điện thoại</p>
              <input type="text" />
            </div>

            <div className={cx("input-form")}>
              <p>Lời nhắn</p>
              <input type="text" />
            </div>

            <Button iconLeft={<i className="fa-regular fa-paper-plane"></i>}>
              Gửi yêu cầu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceContact;
