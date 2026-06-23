import classNames from "classnames/bind";
import styles from "../About.module.scss";
import { historyContent, strengths } from "../constants/aboutData";

const cx = classNames.bind(styles);

const AboutHistory = () => {
  return (
    <div className={cx("info-history")}>
      <div className={cx("left")}>
        <h3 className={cx("title")} data-aos="fade-down">
          Câu Chuyện Của Chúng Tôi
        </h3>

        <div className={cx("desc")} data-aos="fade-up">
          {historyContent.map((item: string, idx: number) => (
            <p key={idx}>{item}</p>
          ))}
        </div>

        <div className={cx("role")}>
          {strengths.map((item) => (
            <div key={item}>
              <span>
                <i className="fa-solid fa-circle-check"></i>
              </span>

              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={cx("right")} data-aos="fade-left">
        <img
          src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80"
          alt="Auto Viet"
        />

        <div className={cx("img-info")}>
          <p>" Chất lượng tạo nên thương hiệu "</p>
          <p>- Phương châm hoạt động suốt 15 năm qua -</p>
        </div>
      </div>
    </div>
  );
};

export default AboutHistory;
