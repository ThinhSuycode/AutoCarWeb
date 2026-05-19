import classNames from "classnames/bind";
import styles from "./Articles.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { callApi } from "../../services/api";
import { useDebounce } from "../../hooks/useDebounce";

import type {
  ArticleResponse,
  Articles,
  FilterArticleType,
} from "../../types/articles";

import { Button } from "../../components/Button/Button";
import { filterArticle } from "../../data/articleData";
import ListArticle from "../../components/ListArticle/ListArticle";
import LoadingData from "../../components/LoadingData/LoadingData";

const cx = classNames.bind(styles);

const CACHE_DURATION = 5 * 60 * 1000;

const Article = () => {
  const [articleData, setArticleData] = useState<Articles[]>([]);
  const [filteredData, setFilteredData] = useState<Articles[]>([]);
  const [showArticleData, setShowArticleData] = useState<Articles[]>([]);

  const [articleCurrent, setArticleCurrent] = useState<number>(6);

  const [filterValue, setFilterValue] = useState<string>("Tất cả");

  const [searchValue, setSearchValue] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const [bannerState, setBannerState] = useState<
    "visible" | "hiding" | "hidden"
  >("visible");

  const searchDelay = useDebounce(searchValue, 400);

  // CACHE
  const articleCache = useRef<Articles[] | null>(null);

  const cacheTime = useRef<number | null>(null);

  // FETCH DATA
  useEffect(() => {
    const controller = new AbortController();

    const fetchArticleData = async () => {
      try {
        setLoading(true);

        setError(null);

        const now = Date.now();

        const isExpired =
          !cacheTime.current || now - cacheTime.current > CACHE_DURATION;

        let articles: Articles[] = [];

        // Dùng cache
        if (!isExpired && articleCache.current) {
          articles = articleCache.current;
        } else {
          // Fetch API
          const response =
            await callApi.getData<ArticleResponse>("articles?all=true");

          articles = response.data;

          // Save cache
          articleCache.current = articles;

          cacheTime.current = now;
        }

        if (!controller.signal.aborted) {
          setArticleData(articles);

          setFilteredData(articles);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch articles:", err);

          setError("Không thể tải dữ liệu bài viết");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchArticleData();

    return () => controller.abort();
  }, []);

  // FILTER + SEARCH
  useEffect(() => {
    let filtered = [...articleData];

    // FILTER CATEGORY
    if (filterValue !== "Tất cả") {
      filtered = filtered.filter(
        (item: Articles) => item.category === filterValue,
      );
    }

    // SEARCH TITLE
    if (searchDelay.trim()) {
      filtered = filtered.filter((item: Articles) =>
        item.title.toLowerCase().includes(searchDelay.toLowerCase()),
      );
    }

    setFilteredData(filtered);

    setArticleCurrent(6);
  }, [articleData, filterValue, searchDelay]);

  // PAGINATION
  useEffect(() => {
    setShowArticleData(filteredData.slice(0, articleCurrent));
  }, [filteredData, articleCurrent]);

  // BANNER ANIMATION
  useEffect(() => {
    if (searchValue.trim() !== "") {
      setBannerState("hiding");

      const timer = setTimeout(() => {
        setBannerState("hidden");
      }, 200);

      return () => clearTimeout(timer);
    }

    setBannerState("visible");
  }, [searchValue]);

  // LOAD MORE
  const onHandleAddArticle = useCallback(() => {
    setArticleCurrent((prev) => prev + 4);
  }, []);

  const isDebouncing = searchValue.trim() !== "" && searchValue !== searchDelay;

  // LOADING
  if (loading) return <LoadingData />;

  // ERROR
  if (error) return <div>{error}</div>;

  return (
    <div className={cx("article-page")}>
      {/* SEARCH */}
      <div className={cx("form-search")} data-aos="fade-right">
        <div className={cx("left")}>
          <h3>TIN TỨC & TƯ VẤN</h3>

          <p>
            Cập nhật thông tin thị trường ô tô, kinh nghiệm mua bán và chăm sóc
            xe hữu ích nhất từ chuyên gia AutoViet.
          </p>
        </div>

        <div className={cx("right")}>
          <div className={cx("input-form")}>
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />

            {searchValue.trim() && (
              <div className={cx("icon")}>
                {isDebouncing ? (
                  <div className={cx("icon-load")}>
                    <i className="fa-solid fa-spinner"></i>
                  </div>
                ) : (
                  <div
                    className={cx("icon-close")}
                    onClick={() => setSearchValue("")}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className={cx("main")}>
        {/* BANNER */}
        {bannerState !== "hidden" && (
          <div
            className={cx("banner-news", {
              hidding: bannerState === "hiding",

              showBanner: bannerState === "visible",
            })}
            data-aos="fade-up"
          >
            <div className={cx("content")}>
              <div className={cx("heading")}>
                <div className={cx("status-title")}>Tư vấn mua xe</div>

                <h2>Top 5 Mẫu Xe SUV Đáng Mua Nhất Năm 2024</h2>

                <p>Thị trường SUV năm 2024 đang sôi động hơn bao giờ hết.</p>
              </div>
            </div>
          </div>
        )}

        {/* FILTER */}
        <div className={cx("news-filters")}>
          <div className={cx("nav-filters")}>
            {filterArticle.map((item: FilterArticleType, index: number) => (
              <div
                key={index}
                className={cx("item-nav", {
                  active: filterValue === item.nameVI,
                })}
                onClick={() => setFilterValue(item.nameVI)}
              >
                {item.nameVI}
              </div>
            ))}
          </div>

          {/* LIST */}
          <ListArticle
            data={showArticleData}
            emptyDesc="Không tìm thấy bài viết phù hợp!!"
          />

          {/* LOAD MORE */}
          {showArticleData.length < filteredData.length ? (
            <div className={cx("add-news")} onClick={onHandleAddArticle}>
              <span>Xem thêm bài viết</span>

              <span>
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          ) : filteredData.length > 0 ? (
            <div className={cx("empty-add")}>
              Chúng tôi sẽ cập nhật thêm. Cảm ơn đã đọc tin tức ^^
            </div>
          ) : null}

          {/* REGISTER */}
          <div className={cx("register-news")} data-aos="fade-up">
            <h3>Đăng Ký Nhận Tin Tức</h3>

            <p>
              Nhận thông tin về xe mới, khuyến mãi và mẹo chăm sóc xe hữu ích.
            </p>

            <div className={cx("form-send")}>
              <input type="text" placeholder="Nhập email của bạn..." />

              <Button>Đăng ký</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
