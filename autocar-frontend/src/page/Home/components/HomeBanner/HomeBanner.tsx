import classNames from "classnames/bind";
import styles from "./HomeBanner.module.scss";
import { Button } from "../../../../components/Button/Button";
import useSearchCars from "./hooks/useSearchCars";
import SearchResult from "./components/SearchResult/SearchResult";

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
  const {
    carsResult,
    isLoading,
    search,
    setSearch,
    handleClearAll,
    isDebouncing,
  } = useSearchCars();
  console.log(carsResult);
  return (
    <div className={cx("home-banner")}>
      <div className={cx("circle-left")}></div>
      <div className={cx("circle-right")}></div>
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

        <div className={cx("search-wrapper")}>
          <div className={cx("form-input")} data-aos="fade-up">
            <input
              type="text"
              placeholder="Tìm kiếm xe tại đây"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.trim().length > 0 ? (
              isDebouncing ? (
                <span className={cx("loading")}>
                  <i className="fa-solid fa-circle-notch"></i>
                </span>
              ) : (
                <span className={cx("clear-all")} onClick={handleClearAll}>
                  <i className="fa-solid fa-x"></i>
                </span>
              )
            ) : (
              <></>
            )}
          </div>
          {search.trim() && carsResult?.length > 0 && (
            <SearchResult
              cars={carsResult ?? []}
              isLoading={isLoading}
            ></SearchResult>
          )}
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
