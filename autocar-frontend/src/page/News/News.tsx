import classNames from "classnames/bind";
import styles from "./News.module.scss";
import Button from "../../components/Button/Button";
import { useCallback, useEffect, useState } from "react";
import type { ArticlesItem } from "../../services/data/carsData";
import { callApi } from "../../services/api";
import { useDebounce } from "../../hooks/useDebounce";
import { onHandleReadArticle } from "../../hooks/HandleArticles";

const cx = classNames.bind(styles);
const filterArticle: string[] = [
  "Tất Cả",
  "Tin Tức Xe",
  "Tư Vấn Mua Xe",
  "Khuyến Mãi",
  "Bảo Dưỡng",
];

const News = () => {
  const [articleData, setArticleData] = useState<ArticlesItem[]>([]);
  const [filteredData, setFilteredData] = useState<ArticlesItem[]>([]);
  const [showArticleData, setShowArticleData] = useState<ArticlesItem[]>([]);
  const [articleCurrent, setArticleCurrent] = useState<number>(6);
  const [filterValue, setFilterValue] = useState<string>("Tất Cả");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isHiding, setIsHiding] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const searchDelay = useDebounce(searchValue, 400);

  // Fetch dữ liệu ban đầu
  useEffect(() => {
    const fetchArticleData = async () => {
      const data = await callApi.getData("articles");
      if (data && Array.isArray(data)) {
        setArticleData(data);
        setFilteredData(data);
      }
    };
    fetchArticleData();
  }, []);

  // Xử lý filter
  useEffect(() => {
    if (articleData.length === 0) return;

    let filtered = [...articleData];

    if (filterValue !== "Tất Cả") {
      filtered = filtered.filter(
        (item: ArticlesItem) => item.category === filterValue,
      );
    }

    if (searchDelay.trim()) {
      filtered = filtered.filter((item: ArticlesItem) =>
        item.title.toLowerCase().includes(searchDelay.toLowerCase()),
      );
    }

    setFilteredData(filtered);
    setArticleCurrent(6);
  }, [articleData, filterValue, searchDelay]);

  // Xử lý pagination
  useEffect(() => {
    const articlesToShow = filteredData.slice(0, articleCurrent);
    setShowArticleData(articlesToShow);
  }, [filteredData, articleCurrent]);

  // Xử lý thêm bài viết
  const onHandleAddArticle = useCallback(() => {
    setArticleCurrent((prev) => prev + 4);
  }, []);

  useEffect(() => {
    if (searchValue.trim() !== "") {
      setIsHiding(true);

      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      // Hiện lại banner
      setShowBanner(true);
      setIsHiding(false);
    }
  }, [searchValue]);
  const isSearching = searchValue.trim() !== "" && searchValue !== searchDelay;
  return (
    <div className={cx("news-page")}>
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
                {isSearching ? (
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
      <div className={cx("main")}>
        {showBanner && (
          <div
            className={cx("banner-news", {
              hidding: isHiding,
              showBanner: !isHiding,
            })}
            data-aos="fade-up"
          >
            <div className={cx("content")}>
              <div className={cx("heading")}>
                <div className={cx("status-title")}>Tư vấn mua xe</div>
                <h2>
                  Top 5 Mẫu Xe SUV Đáng Mua Nhất Năm 2024: Đánh Giá Chi Tiết &
                  So Sánh
                </h2>
                <p>
                  Thị trường SUV năm 2024 đang sôi động hơn bao giờ hết với sự
                  xuất hiện của nhiều mẫu xe mới. Cùng AutoViet điểm qua 5 cái
                  tên sáng giá nhất trong phân khúc, từ thiết kế, hiệu năng đến
                  công nghệ an toàn.
                </p>
              </div>
              <div className={cx("info-user")}>
                <div className={cx("info-item")}>
                  <span>
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <span>Trần Quý Thịnh</span>
                </div>
                <div className={cx("info-item")}>
                  <span>
                    <i className="fa-regular fa-calendar"></i>
                  </span>
                  <span>15/1/2026</span>
                </div>
                <div className={cx("info-item")}>
                  <span>
                    <i className="fa-solid fa-clock"></i>
                  </span>
                  <span>50 phút đọc</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={cx("news-filters")}>
          <div className={cx("nav-filters")}>
            {filterArticle.map((item: string, index: number) => (
              <div
                key={index}
                className={cx("item-nav", { active: filterValue === item })}
                onClick={() => setFilterValue(item)}
              >
                {item}
              </div>
            ))}
          </div>
          <div className={cx("list-news")}>
            {showArticleData.length > 0 ? (
              showArticleData.map((article: ArticlesItem) => (
                <div
                  className={cx("news-item")}
                  key={article.id}
                  onClick={() => onHandleReadArticle(article)}
                  data-aos="flip-right"
                >
                  <div className={cx("img")}>
                    <img src={article.image} alt={article.title} />
                    <div className={cx("category-img")}>{article.category}</div>
                  </div>
                  <div className={cx("content")}>
                    <div className={cx("post-time")}>
                      <div>
                        <span>
                          <i className="fa-regular fa-calendar"></i>
                        </span>
                        <span>{article.date}</span>
                      </div>
                      <div>
                        <span>
                          <i className="fa-solid fa-clock"></i>
                        </span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <div className={cx("article-info")}>
                      <h4>{article.title}</h4>
                      <p>{article.excerpt}</p>
                    </div>
                    <div
                      className={cx("article-add")}
                      onClick={() => onHandleReadArticle(article)}
                    >
                      <span>Đọc tiếp</span>
                      <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={cx("empty-state")}>
                <i className="fa-regular fa-face-grin-beam-sweat"></i>
                <h3> "Không tìm thấy bài viết phù hợp"</h3>
              </div>
            )}
          </div>
          {showArticleData.length < filteredData.length ? (
            <div className={cx("add-news")} onClick={onHandleAddArticle}>
              <span>Xem thêm bài viết</span>
              <span>
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          ) : filteredData.length > 0 && showArticleData.length > 0 ? (
            <div className={cx("empty-add")}>
              Chúng tôi sẽ cập nhật thêm. Cảm ơn đã đọc tin tức ^^
            </div>
          ) : null}
          <div className={cx("register-news")} data-aos="fade-up">
            <h3>Đăng Ký Nhận Tin Tức</h3>
            <p>
              Đăng Ký Nhận Tin Tức Nhận thông tin về xe mới, khuyến mãi và mẹo
              chăm sóc xe hữu ích hàng tuần. Không spam, hủy đăng ký bất cứ lúc
              nào.
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

export default News;
