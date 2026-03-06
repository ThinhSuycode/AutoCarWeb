import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import bannerFooter from "../../assets/img/bannerbottom.png";
import Button from "../../components/Button/Button";
import {
  // carsBrand,
  // priceRanges,
  // transmissions,
  // years,
  type Brands,
  type Car,
  type FilterOptions,
} from "../../services/data/carsData";
import ListProduct from "../../components/ListProduct/ListProduct";
import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { callApi } from "../../services/api";

const cx = classNames.bind(styles);

const Home = () => {
  const [brand, setBrand] = useState<string>("");
  const [price, setprice] = useState<string>("");
  const [year, setyear] = useState<string>("");
  const [transmiss, settransmiss] = useState<string>("");
  const [dataCarDefault, setDataCarDefault] = useState<Car[]>([]);
  const [dataCarShow, setDataCarShow] = useState<Car[]>([]);
  const [dataFilter, setDataFilter] = useState<FilterOptions>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carData, filterOptions] = await Promise.all([
          callApi.getData("carData"),
          callApi.getData("filterOptions"),
        ]);
        setDataCarDefault(carData);
        setDataCarShow(carData);
        setDataFilter(filterOptions);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let dataCarsFilter = [...dataCarDefault];
    if (brand && brand !== "all") {
      dataCarsFilter = dataCarsFilter.filter(
        (car) => car.brand.toLowerCase() === brand.toLowerCase(),
      );
    }
    if (price && price.includes("-")) {
      const [minPrice, maxPrice] = price
        .split("-")
        .map((item) => Number(item.trim()));
      dataCarsFilter = dataCarsFilter.filter(
        (car) => car.price >= minPrice && car.price <= maxPrice,
      );
    }

    if (year && year !== "Tất cả") {
      dataCarsFilter = dataCarsFilter.filter(
        (car) => car.year.toString() === year,
      );
    }

    if (transmiss && transmiss !== "Tất cả") {
      dataCarsFilter = dataCarsFilter.filter(
        (car) => car.transmission === transmiss,
      );
    }

    setDataCarShow(dataCarsFilter);
  }, [brand, price, year, transmiss]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_KEYS}/filterOptions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("API error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("DATA:", data.brands);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
      });
  }, []);

  return (
    <div className={cx("home-inner")}>
      <div className={cx("home-banner")}>
        <img src={bannerFooter} alt="" className={cx("banner-footer")} />
        <div className={cx("banner-content")}>
          <div className={cx("banner-content-top")}>
            <div data-aos="fade-down">
              <span>
                <i className="fa-solid fa-car-side"></i>
              </span>
              <span>Hơn 500+ xe đang bán</span>
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
              <div className={cx("heading")}>500+</div>
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
          <div className={cx("filter-list-nav")}>
            <select
              name="companyFilter"
              id="companyFilter"
              data-aos="zoom-in"
              onChange={(e) => setBrand(e.target.value)}
            >
              {dataFilter?.brands.map((brand: Brands, idx: number) => (
                <option value={brand.value} key={idx}>
                  {brand.title}
                </option>
              ))}
            </select>
            <select
              name="priceFilter"
              id="priceFilter"
              data-aos="zoom-in"
              onChange={(e) => setprice(e.target.value)}
            >
              {dataFilter?.priceRanges.map((price, idx: number) => (
                <option value={price.value} key={idx}>
                  {price.label}
                </option>
              ))}
            </select>
            <select
              name="yearFilter"
              id="yearFilter"
              data-aos="zoom-in"
              onChange={(e) => setyear(e.target.value)}
            >
              {dataFilter?.years.map((year, idx: number) => (
                <option value={year} key={idx}>
                  {year}
                </option>
              ))}
            </select>
            <select
              name="transmissionFilter"
              id="transmissionFilter"
              data-aos="zoom-in"
              onChange={(e) => settransmiss(e.target.value)}
            >
              {dataFilter?.transmissions.map((transmiss, idx: number) => (
                <option value={transmiss} key={idx}>
                  {transmiss}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ListProduct
          productsData={dataCarShow.slice(0, 6)}
          heading="Xe đang bán"
          desc={`${dataCarShow.length} sản phẩm đã có`}
        ></ListProduct>
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
