import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import bannerFooter from "../../../assets/img/bannerbottom.png";
import { Button } from "../../../components/Button/Button";

const cx = classNames.bind(styles);

interface BannerStat {
  icon: string;
  heading: string;
  desc: string;
}

interface HomeBannerProps {
  carCount: number;
  bannerStats: BannerStat[];
}

const HomeBanner = ({ carCount, bannerStats }: HomeBannerProps) => {
  return (
    <div className={cx("home-banner")}>
      <img src={bannerFooter} alt="" className={cx("banner-footer")} />
      <div className={cx("banner-content")}>
        <div className={cx("banner-content-top")}>
          <div data-aos="fade-down">
            <span>
              <i className="fa-solid fa-car-side" />
            </span>
            <span>Hơn {carCount}+ xe đang bán</span>
          </div>
          <div className={cx("title")} data-aos="fade-down">
            <p>Tìm Xe Ô Tô</p>
            <p>Của bạn</p>
          </div>
          <div data-aos="fade-up">
            Khám phá bộ sưu tập xe ô tô chất lượng cao với giá cả cạnh tranh.
            Cam kết bảo hành và hỗ trợ trả góp lên đến 80%.
          </div>
        </div>

        <div className={cx("form-input")} data-aos="fade-up">
          <input type="text" placeholder="Tìm kiếm xe tại đây" />
          <Button>Tìm kiếm</Button>
        </div>

        <div className={cx("banner-content-bottom")}>
          {bannerStats.map((stat, idx) => (
            <div key={idx} className={cx("info-item")} data-aos="flip-left">
              <div className={cx("icon")}>
                <i className={stat.icon} />
              </div>
              <div className={cx("heading")}>{stat.heading}</div>
              <div className={cx("desc")}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
