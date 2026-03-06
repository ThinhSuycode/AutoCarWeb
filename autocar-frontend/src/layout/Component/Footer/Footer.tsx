import React from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
// import logo from "../../../assets/icon/logofooter.png";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("footer-inner")}>
      <div className={cx("footer-content")}>
        <div className={cx("footer-left")}>
          <div className={cx("heading")}>
            <span>
              <i className="fa-solid fa-arrow-right-arrow-left"></i>
            </span>
            <div>
              <p>Auto Việt</p>
              <p>
                Vương tầm thế giới <i className="fa-solid fa-crown"></i>
              </p>
            </div>
          </div>
          <p className={cx("desc")}>
            Đơn vị hàng đầu trong lĩnh vực mua bán xe ô tô đã qua sử dụng tại
            Việt Nam
          </p>
          <div className={cx("social")}>
            <span>
              <i className="fa-brands fa-facebook"></i>
            </span>
            <span>
              <i className="fa-brands fa-youtube"></i>
            </span>
            <span>
              <i className="fa-brands fa-instagram"></i>
            </span>
          </div>
        </div>
        <div className={cx("footer-mid")}>
          <div className={cx("col")}>
            <p className={cx("heading-col")}>Liên kết nhanh</p>
            <div className={cx("list-col-info")}>
              <p>Xe đang bán</p>
              <p>Dịch vụ bảo dưỡng</p>
              <p>Thu mua xe cũ</p>
              <p>Tư vấn trả góp</p>
            </div>
          </div>
          <div className={cx("col")}>
            <p className={cx("heading-col")}>Liên hệ</p>
            <div className={cx("list-col-info")}>
              <div>
                <span>
                  <i className="fa-solid fa-map-location-dot"></i>
                </span>
                <span>Tuy Phước, Qui Nhơn, Bình Định Cũ</span>
              </div>
              <div>
                <span>
                  <i className="fa-solid fa-phone"></i>
                </span>
                <span>0869114177</span>
              </div>
              <div>
                <span>
                  <i className="fa-regular fa-envelope"></i>
                </span>
                <span>thinhtran.31231026283@st.ueh.edu.vn</span>
              </div>
            </div>
          </div>
          <div className={cx("col")}>
            <p className={cx("heading-col")}>Giờ làm việc</p>
            <div className={cx("list-col-info")}>
              <div>
                <p>Thứ 2 - Thứ 6: </p>
                <p>8:00 - 18:00</p>
              </div>
              <div>
                <p>Thứ 7: </p>
                <p>8:00 - 17:00</p>
              </div>
              <div>
                <p>Chủ nhật: </p>
                <p>9:00 - 15:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("footer-coppyright")}>
        © 2024 AutoViet. Tất cả quyền được bảo lưu.
      </div>
    </div>
  );
};

export default Footer;
