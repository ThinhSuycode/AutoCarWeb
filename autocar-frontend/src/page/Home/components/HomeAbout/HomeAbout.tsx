import classNames from "classnames/bind";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import styles from "./HomeAbout.module.scss";
import { config } from "../../../../config";

const cx = classNames.bind(styles);

const ABOUT_STATS = [
  { end: 8, suffix: "+", label: "Năm kinh nghiệm" },
  { end: 1200, suffix: "+", label: "Xe đã bàn giao" },
  { end: 980, suffix: "+", label: "Khách hàng hài lòng" },
];

const HomeAbout = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className={cx("home-about")} ref={ref}>
      <div className={cx("about-inner")}>
        {/* MEDIA */}
        <div className={cx("about-media")}>
          <div className={cx("media-main")}>
            <img
              src="https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1200&auto=format&fit=crop"
              alt="Showroom AutoCarWeb"
            />
          </div>

          <div className={cx("media-float")}>
            <img
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=600&auto=format&fit=crop"
              alt="Tư vấn khách hàng tại AutoCarWeb"
            />
          </div>

          <div className={cx("media-badge")}>
            <i className="fa-solid fa-shield-halved" />
            <div>
              <strong>Bảo hành 3 năm</strong>
              <span>Cho mọi dòng xe</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className={cx("about-content")}>
          <span className={cx("eyebrow")}>Về AutoCarWeb</span>

          <h2>
            Hành trình sở hữu xe hơi
            <span>bắt đầu từ sự tin tưởng</span>
          </h2>

          <p className={cx("desc")}>
            AutoCarWeb kết nối bạn với hàng trăm mẫu xe chính hãng, đầy đủ giấy
            tờ và lịch sử rõ ràng. Đội ngũ tư vấn đồng hành cùng bạn từ lúc chọn
            xe, hỗ trợ trả góp, đến khi xe lăn bánh — minh bạch trong từng bước,
            không phát sinh chi phí ẩn.
          </p>

          <div className={cx("about-stats")}>
            {ABOUT_STATS.map((stat) => (
              <div className={cx("stat")} key={stat.label}>
                <strong>
                  {inView ? (
                    <CountUp
                      end={stat.end}
                      duration={1.6}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <a href={config.Routes.ShowRoom} className={cx("about-cta")}>
            <span className={cx("cta-fill")} />
            <span className={cx("cta-label")}>
              Khám phá showroom
              <i className="fa-solid fa-arrow-right" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
