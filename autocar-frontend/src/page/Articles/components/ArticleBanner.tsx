import classNames from "classnames/bind";
import styles from "../Articles.module.scss";

const cx = classNames.bind(styles);

interface Props {
  bannerState: "visible" | "hiding" | "hidden";
}

const ArticleBanner = ({ bannerState }: Props) => {
  if (bannerState === "hidden") return null;

  return (
    <div
      className={cx("banner-news", {
        hidding: bannerState === "hiding",
        showBanner: bannerState === "visible",
      })}
      data-aos="fade-up"
    >
      <div className={cx("content")}>
        <div className={cx("heading")}>
          <div className={cx("status-title")}>
            Tư vấn mua xe
          </div>

          <h2>
            Top 5 Mẫu Xe SUV Đáng Mua Nhất Năm 2024
          </h2>

          <p>
            Thị trường SUV năm 2024 đang sôi động
            hơn bao giờ hết.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleBanner;