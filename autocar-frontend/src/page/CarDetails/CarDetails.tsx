import classNames from "classnames/bind";
import styles from "./CarDetails.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { callApi, changeApi } from "../../services/api";
import NavigationPage from "../../components/NavigationPage/NavigationPage";
import Button from "../../components/Button/Button";
import type { Car, CarDetails, infoSpecs } from "../../services/data/carsData";
import EmptyData from "../../components/EmtyData/EmptyData";
import { useNavigate } from "react-router-dom";
import type { CustomerType } from "../../services/data/customer";

const cx = classNames.bind(styles);

const CarDetailsComponent = () => {
  const navigate = useNavigate();
  const [customerEmail] = useState<string>(() => {
    const cus = localStorage.getItem("accountActive");
    return cus ? JSON.parse(cus) : "";
  });

  const [customerData, setCustomerData] = useState<CustomerType | null>(null);
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [imgCurrent, setImgCurrent] = useState({
    img: "",
    idx: 0,
  });
  const [carActive] = useState<Car | null>(() => {
    const local = localStorage.getItem("carActive");
    return local ? JSON.parse(local) : null;
  });
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!customerEmail) return;
        const fetchCarDetail = callApi.getData("carDetails");
        const fetchCustomer = customerEmail
          ? callApi.getData("customer")
          : Promise.resolve(null);

        const [carDetailData, customerData] = await Promise.all([
          fetchCarDetail,
          fetchCustomer,
        ]);
        //Car detail
        if (carDetailData && Array.isArray(carDetailData)) {
          const filterData = carDetailData.find(
            (detail: CarDetails) => detail.id === carActive?.id,
          );
          if (filterData) {
            setCarDetails(filterData);

            if (filterData.images && filterData.images.length > 0) {
              setImgCurrent({
                img: filterData.images[0],
                idx: 0,
              });
            }
          }
        }
        //Customer account
        if (customerData && Array.isArray(customerData)) {
          const data = customerData.find(
            (cus: CustomerType) => cus.email === customerEmail,
          );
          setCustomerData(data);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    if (carActive?.id) {
      fetchData();
    }
  }, [carActive?.id, customerEmail]);

  const onHandleFavourite = useCallback(
    async (id: string) => {
      if (!customerEmail) {
        alert("Vui lòng thực hiện đăng nhập để thêm sản phẩm!!");
        navigate("/");
        return;
      }
      if (!id || !customerData) return;
      const currentFavourite = [...(customerData.favouriteCar ?? [])];
      const isAlreadyFavourite = currentFavourite.includes(id);
      const updateFavouriteData = isAlreadyFavourite
        ? currentFavourite.filter((fav: string) => fav !== id)
        : [...currentFavourite, id];
      const dataNew: CustomerType = {
        ...customerData,
        favouriteCar: updateFavouriteData,
      };

      const result = await changeApi.getData(
        `customer/${customerData.id}`,
        "patch",
        dataNew,
      );
      if (result) {
        setCustomerData(dataNew);
      } else {
        alert("Sản phẩm lỗi !!");
        return;
      }
    },
    [customerData, navigate],
  );

  const onChangeImg = (img: string, idx: number) => {
    if (idx === imgCurrent.idx || isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setImgCurrent({ img, idx });
      setIsTransitioning(false);
    }, 300);
  };
  const isFavourite = useMemo(() => {
    if (!customerData?.favouriteCar || !carDetails?.id) return false;
    return customerData.favouriteCar.includes(carDetails.id);
  }, [customerData?.favouriteCar, carDetails?.id]);
  if (!carDetails) {
    return <EmptyData></EmptyData>;
  }

  return (
    <div className={cx("carDetails-inner")}>
      <NavigationPage pageActive="Xe đang bán" title={carDetails.name} />
      <div className={cx("content")}>
        <div className={cx("left")}>
          <div className={cx("car-image-inner")}>
            <div className={cx("image__large")}>
              <img
                src={
                  imgCurrent.img ||
                  "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200"
                }
                className={cx({ transitioning: isTransitioning })}
                alt="Car main view"
              />
              <div className={cx("count-current")}>
                {imgCurrent.idx + 1}/{carDetails.images?.length || 5}
              </div>
            </div>
            <div className={cx("list-image__small")}>
              {carDetails.images?.map((img, idx: number) => (
                <div
                  key={idx}
                  className={cx("img-item", { active: idx === imgCurrent.idx })}
                  onClick={() => onChangeImg(img, idx)}
                >
                  <img
                    src={
                      img ||
                      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200"
                    }
                    alt={`Car view ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={cx("car-description")}>
            <h3>Mô tả chi tiết</h3>
            <p>
              {carDetails.description ||
                "Xe gia đình sử dụng kỹ, bảo dưỡng định kỳ tại hãng. Cam kết không đâm đụng, không ngập nước. Nội thất da cao cấp còn mới nguyên, đầy đủ tiện nghi hiện đại. Hỗ trợ sang tên nhanh chóng trong ngày."}
            </p>
          </div>

          <div className={cx("car-information")}>
            <div className={cx("specifications")}>
              <div className={cx("heading")}>
                <h3>Thông số kỹ thuật</h3>
              </div>
              <div className={cx("main")}>
                {carDetails.specs?.map((specs, specIndex) => (
                  <div key={specIndex} className={cx("info-item")}>
                    <h4>{specs.title}</h4>
                    <div className={cx("desc")}>
                      {specs.items.map((specsInfo: infoSpecs, itemIndex) => (
                        <div key={itemIndex}>
                          <p>{specsInfo.label}</p>
                          <p>{specsInfo.value || "N/A"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={cx("features")}>
              <div className={cx("heading")}>
                <h3>Tính năng nổi bật</h3>
              </div>
              <div className={cx("main")}>
                {carDetails.features && carDetails.features.length > 0 ? (
                  carDetails.features.map((feature, index) => (
                    <div key={index} className={cx("info-item")}>
                      <div className={cx("icon")}>
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <p>{feature}</p>
                    </div>
                  ))
                ) : (
                  <div className={cx("info-item")}>
                    <div className={cx("icon")}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <p>Hệ thống phanh ABS/EBD/BA</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={cx("right")}>
          <div className={cx("content-top")}>
            <div className={cx("heading")}>
              <div className={cx("brand")}>{carDetails.brand || "Toyota"}</div>
              <div className={cx("action")}>
                <span
                  onClick={() => onHandleFavourite(carDetails.id)}
                  className={cx("favourite-btn", { activeHeart: isFavourite })}
                >
                  <i className="fa-regular fa-heart"></i>
                </span>
                <span className={cx("share-btn", { activeShare: false })}>
                  <i className="fa-solid fa-share-nodes"></i>
                </span>
              </div>
            </div>
            <div className={cx("title")}>
              {carDetails.name || "Toyota Camry 2.5Q 2023"}
            </div>
            <div className={cx("price")}>
              <p>
                {carDetails.price?.toLocaleString("vi-VN") || "1.250.000.000"}₫
              </p>
              <p>Giá đã bao gồm VAT</p>
            </div>
            <div className={cx("specs")}>
              <div>
                <span>
                  <i className="fa-regular fa-calendar"></i>
                </span>
                <span>{carDetails.year || "2023"}</span>
              </div>
              <div>
                <span>
                  <i className="fa-solid fa-gauge-high"></i>
                </span>
                <span>
                  {carDetails.mileage.toLocaleString("vi-VN") || ""} km
                </span>
              </div>
              <div>
                <span>
                  <i className="fa-solid fa-gears"></i>
                </span>
                <span>{carDetails.transmission || "Số tự động"}</span>
              </div>
              <div>
                <span>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span>{carDetails.location || "TP.HCM"}</span>
              </div>
            </div>
            <div className={cx("commitments")}>
              <div>
                <span>
                  <i className="fa-solid fa-circle-check"></i>
                </span>
                <span>Cam kết không đâm đụng, ngập nước</span>
              </div>
              <div>
                <span>
                  <i className="fa-solid fa-circle-check"></i>
                </span>
                <span>Bảo hành động cơ & hộp số 12 tháng</span>
              </div>
              <div>
                <span>
                  <i className="fa-solid fa-circle-check"></i>
                </span>
                <span>Hỗ trợ trả góp lên đến 70%</span>
              </div>
            </div>
          </div>

          <div className={cx("content-bottom")}>
            <div className={cx("heading")}>Liên Hệ Người Bán</div>
            <div className={cx("desc")}>
              Để lại thông tin để được tư vấn chi tiết và đặt lịch xem xe.
            </div>
            <div className={cx("form-request")}>
              <div className={cx("form-input")}>
                <p>Họ và tên</p>
                <input type="text" placeholder="Nhập họ và tên" />
              </div>
              <div className={cx("form-input")}>
                <p>Số điện thoại</p>
                <input type="text" placeholder="Nhập số điện thoại" />
              </div>
              <div className={cx("form-input")}>
                <p>Lời nhắn</p>
                <textarea
                  name="note"
                  id="note"
                  placeholder="Nhập lời nhắn của bạn"
                ></textarea>
              </div>
            </div>
            <Button
              large
              iconLeft={<i className="fa-regular fa-paper-plane"></i>}
            >
              Gửi yêu cầu
            </Button>
            <div className={cx("hotline")}>
              <p>Hoặc liên hệ trực tiếp qua hotline</p>
              <div className={cx("phone-info")}>
                <span>
                  <i className="fa-solid fa-phone"></i>
                </span>
                <span>0869114177</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsComponent;
