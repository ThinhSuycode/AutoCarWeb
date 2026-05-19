import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import bannerFooter from "../../assets/img/bannerbottom.png";
import { useEffect, useState } from "react";
import type { BrandsType, CarType } from "../../types/car";
import { Button } from "../../components/Button/Button";
import FilterOptions from "../../data/FilterOptions";
import Social from "../../components/Social/Social";
import { useCarsFilter } from "../../hooks/useFilterProduct";
import ListProduct from "../../components/ListProduct/ListProduct";

const cx = classNames.bind(styles);

const Home = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { cars, onFilterChange, onReset, filter } = useCarsFilter();

  return (
    <div className={cx("home-page")}>
      <Social></Social>
      <div className={cx("home-banner")}>
        <img src={bannerFooter} alt="" className={cx("banner-footer")} />
        <div className={cx("banner-content")}>
          <div className={cx("banner-content-top")}>
            <div data-aos="fade-down">
              <span>
                <i className="fa-solid fa-car-side"></i>
              </span>
              <span>Hơn {cars.length}+ xe đang bán</span>
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
            <div className={cx("info-item")} data-aos="flip-left">
              <div className={cx("icon")}>
                <i className="fa-solid fa-check-to-slot"></i>
              </div>
              <div className={cx("heading")}>100%</div>
              <div className={cx("desc")}>Xe đã được kiểm định</div>
            </div>
            <div className={cx("info-item")} data-aos="flip-left">
              <div className={cx("icon")}>
                <i className="fa-regular fa-credit-card"></i>
              </div>
              <div className={cx("heading")}>Hỗ trợ trả góp 80%</div>
              <div className={cx("desc")}>Hỗ trợ vay ngân hàng</div>
            </div>
            <div className={cx("info-item")} data-aos="flip-left">
              <div className={cx("icon")}>
                <i className="fa-solid fa-check-to-slot"></i>
              </div>
              <div className={cx("heading")}>{cars.length}+</div>
              <div className={cx("desc")}>Xe đã có sẵn</div>
            </div>
            <div className={cx("info-item")} data-aos="flip-left">
              <div className={cx("icon")}>
                <i className="fa-regular fa-headphones"></i>
              </div>
              <div className={cx("heading")}>24/7</div>
              <div className={cx("desc")}>Hỗ trợ tư vấn</div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("home-products")}>
        <div className={cx("product-filter-inner")}>
          <div
            className={cx("filter-mobile")}
            onClick={() => setOpenFilter((prev) => !prev)}
          >
            <span>
              <i className="fa-solid fa-filter"></i>
            </span>
            <span>Bộ lọc</span>
          </div>
          <div className={cx("filter-list-nav", { openFilter: openFilter })}>
            <select
              name="companyFilter"
              data-aos="zoom-in"
              onChange={(e) => onFilterChange("brand", e.target.value)}
              value={filter.brand}
            >
              {FilterOptions?.brands.map((b: BrandsType, idx: number) => (
                <option value={b.value} key={idx}>
                  {b.title}
                </option>
              ))}
            </select>
            <select
              name="priceFilter"
              data-aos="zoom-in"
              onChange={(e) => onFilterChange("priceRanges", e.target.value)}
              value={filter.priceRanges}
            >
              {FilterOptions?.priceRanges.map((p, idx: number) => (
                <option value={p.label} key={idx}>
                  {p.label}
                </option>
              ))}
            </select>
            <select
              name="yearFilter"
              data-aos="zoom-in"
              onChange={(e) => onFilterChange("yearRanges", e.target.value)}
              value={filter.yearRanges}
            >
              {FilterOptions?.years.map((y, idx: number) => (
                <option value={y} key={idx}>
                  {y}
                </option>
              ))}
            </select>
            <select
              name="transmissionFilter"
              data-aos="zoom-in"
              onChange={(e) => onFilterChange("transmission", e.target.value)}
            >
              {FilterOptions?.transmissions.map((t, idx: number) => (
                <option value={t} key={idx}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ListProduct
          heading="Xe đang bán"
          carShow
          productData={cars.slice(0, 6)}
          desc={`${cars.length} sản phẩm`}
          emptyTitle="Không tìm thấy sản phẩm tại cửa hàng !!"
        />

        <div className={cx("information-inner")}>
          <div className={cx("content")}>
            <div className={cx("heading")} data-aos="fade-left">
              <h3>Tại sao chọn Auto Viet ?</h3>
              <p>
                Chúng tôi cam kết mang đến trải nghiệm mua xe tốt nhất với dịch
                vụ chuyên nghiệp và uy tín
              </p>
            </div>
            <div className={cx("list-item")} data-aos="fade-right">
              <div className={cx("item")}>
                <div className={cx("icon")}>
                  <i className="fa-solid fa-user-shield"></i>
                </div>
                <h4>Bảo Hành Chính Hãng</h4>
                <p>Tất cả xe đều được bảo hành theo tiêu chuẩn chính hãng</p>
              </div>
              <div className={cx("item")}>
                <div className={cx("icon")}>
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <h4>Kiểm Định 150 Điểm</h4>
                <p>Quy trình kiểm tra nghiêm ngặt đảm bảo chất lượng xe</p>
              </div>
              <div className={cx("item")}>
                <div className={cx("icon")}>
                  <i className="fa-solid fa-dollar-sign"></i>
                </div>
                <h4>Hỗ Trợ Trả Góp</h4>
                <p>Vay lên đến 80% giá trị xe với lãi suất ưu đãi</p>
              </div>
              <div className={cx("item")}>
                <div className={cx("icon")}>
                  <i className="fa-solid fa-arrow-right-arrow-left"></i>
                </div>
                <h4>Đổi Trả Trong 7 Ngày</h4>
                <p>Cam kết đổi trả nếu phát hiện lỗi trong 7 ngày đầu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
