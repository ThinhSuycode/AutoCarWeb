import classNames from "classnames/bind";
import styles from "../Services.module.scss";
import img from "../../../assets/img/car-service.jpg";

const cx = classNames.bind(styles);

const ServicesBanner = () => {
  return (
    <div className={cx("banner-inner")} data-aos="fade-right">
      <img src={img} alt="service-banner" />

      <div className={cx("info")}>
        <h2>VỀ AUTOVIET</h2>

        <p>
          AutoViet cung cấp giải pháp toàn diện cho chiếc xe của bạn. Từ bảo
          dưỡng, sửa chữa đến tư vấn tài chính và bảo hiểm.
        </p>
      </div>
    </div>
  );
};

export default ServicesBanner;
