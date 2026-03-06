import classNames from "classnames/bind";
import styles from "./DateRegister.module.scss";

const cx = classNames.bind(styles);
const DateRegister = () => {
  return (
    <div className={cx("dateRegister-page")}>
      <div className={cx("dateRegister-heading")}>
        <h2>Lịch hẹn của tôi</h2>
        <div className={cx("add-calendar")}>
          <span>+</span>
          <span>Đặt lịch mới</span>
        </div>
      </div>
      <div className={cx("list-card")}>
        <div className={cx("card")}>
          <div className={cx("left")}>
            <div className={cx("icon")}>
              <i className={`fa-solid fa-car-side`}></i>
            </div>
          </div>
          <div className={cx("info")}>
            <div className={cx("heading")}>
              <h4>Lái thử xe</h4>
              <div className={cx("status")}>Đã xác nhận</div>
            </div>
            <p className={cx("desc")}>Toyota Camry 2.5Q</p>

            <div className={cx("meta")}>
              <div>
                <span>
                  <i className="fa-regular fa-calendar"></i>
                </span>
                <span> 20/02/2024</span>
              </div>
              <div>
                <span>
                  <i className="fa-regular fa-clock"></i>
                </span>
                <span> 09:00</span>
              </div>
              <div>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span>AutoViet Sài Gòn - Quận 7</span>
              </div>
            </div>
            <div className={cx("note")}>
              Yêu cầu nhân viên tư vấn về trả góp
            </div>

            <div className={cx("cancel")}>
              <i className="fa-regular fa-circle-xmark"></i>

              <span>Hủy lịch hẹn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRegister;
