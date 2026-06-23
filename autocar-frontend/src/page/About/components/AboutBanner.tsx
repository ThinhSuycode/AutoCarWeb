import classNames from "classnames/bind";
import styles from "../About.module.scss";
import { Button } from "../../../components/Button/Button";
import { config } from "../../../config";

const cx = classNames.bind(styles);

const AboutBanner = () => {
  return (
    <div className={cx("banner-about")} data-aos="fade-right">
      <div className={cx("info-banner")}>
        <div className={cx("heading")}>
          <h2>
            VỀ <span>AUTO VIET</span>
          </h2>

          <p>
            Hành trình 15 năm kiến tạo niềm tin và mang đến những chiếc xe chất
            lượng nhất cho người Việt.
          </p>
        </div>

        <div className={cx("btn-act")}>
          <Button href={config.Routes.Contact}>LIÊN HỆ NGAY</Button>

          <Button href={config.Routes.ShowRoom}>XEM SHOWROOM</Button>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
