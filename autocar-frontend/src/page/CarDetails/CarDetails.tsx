import classNames from "classnames/bind";
import styles from "./CarDetails.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { callApi, changeApi } from "../../services/api";
import NavigationPage from "../../components/NavigationPage/NavigationPage";
import EmptyData from "../../components/EmtyData/EmptyData";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../../types/users";
import type { CarType, CarDetailsType, InfoSpecsType } from "../../types/car";
import { getMeApi } from "../../services/auth.service";
import toast from "react-hot-toast";
import LoadingData from "../../components/LoadingData/LoadingData";
import FormContact from "../../components/FormContact/FormContact";

const cx = classNames.bind(styles);

const CarDetailsComponent = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [carDetails, setCarDetails] = useState<CarDetailsType | null>(null);
  const [imgCurrent, setImgCurrent] = useState({
    img: "",
    idx: 0,
  });
  const [carActive] = useState<CarType | null>(() => {
    const local = localStorage.getItem("carActive");
    return local ? JSON.parse(local) : null;
  });
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLogin = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchCarDetail = callApi.getData<CarDetailsType>("carDetail");
        const fetchUser = getMeApi();
        const [carDetailData, userData] = await Promise.all([
          fetchCarDetail,
          fetchUser,
        ]);
        setUserInfo(userData);

        //Car detail
        if (carDetailData && Array.isArray(carDetailData)) {
          const filterData = carDetailData.find(
            (detail: CarDetailsType) => detail.id === carActive?.id,
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
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Không thể tải thông tin xe!");
      } finally {
        setIsLoading(false);
      }
    };
    if (carActive?.id) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [carActive?.id, isLogin]);

  const onHandleFavourite = useCallback(
    async (id: string) => {
      if (!userInfo) {
        toast.error("Vui lòng đăng nhập để thêm sản phẩm yêu thích!");
        setTimeout(() => navigate("/dang-nhap"), 1500);
        return;
      }
      if (!id) return;

      const currentFavourite = [...(userInfo.favouriteCar ?? [])];
      const isAlreadyFavourite = currentFavourite.includes(id);
      const updateFavouriteData = isAlreadyFavourite
        ? currentFavourite.filter((fav: string) => fav !== id)
        : [...currentFavourite, id];

      const dataNew: UserType = {
        ...userInfo,
        favouriteCar: updateFavouriteData,
      };

      try {
        const result = await changeApi.request<UserType>(
          `users`,
          "patch",
          dataNew,
          userInfo._id,
        );

        if (result) {
          setUserInfo(dataNew);
          if (isAlreadyFavourite) {
            toast.success("Đã xóa khỏi danh sách yêu thích!");
          } else {
            toast.success("Đã thêm vào danh sách yêu thích!");
          }
        } else {
          toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Favourite error:", error);
        toast.error("Không thể cập nhật yêu thích!");
      }
    },
    [userInfo, navigate],
  );

  const onChangeImg = (img: string, idx: number) => {
    if (idx === imgCurrent.idx || isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setImgCurrent({ img, idx });
      setIsTransitioning(false);
    }, 300);
  };

  //  Handle share
  const onHandleShare = useCallback(() => {
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: carDetails?.name || "Chi tiết xe",
          text: `Xem chi tiết ${carDetails?.name} - Giá: ${carDetails?.price?.toLocaleString("vi-VN")}₫`,
          url: url,
        })
        .then(() => toast.success("Chia sẻ thành công!"))
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Share error:", error);
          }
        });
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => toast.success("Đã sao chép link vào clipboard!"))
        .catch(() => toast.error("Không thể sao chép link!"));
    }
  }, [carDetails]);

  const isFavourite = useMemo(() => {
    if (!userInfo?.favouriteCar || !carDetails?.id) return false;
    return userInfo.favouriteCar.includes(carDetails.id);
  }, [userInfo?.favouriteCar, carDetails?.id]);

  if (isLoading) {
    return <LoadingData></LoadingData>;
  }

  if (!carDetails) {
    return <EmptyData />;
  }

  return (
    <div className={cx("carDetails-page")}>
      <NavigationPage pageActive="Xe đang bán" title={carDetails?.name || ""} />
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
              {carDetails.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className={cx("img-item", {
                    active: idx === imgCurrent.idx,
                  })}
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

          <div className={cx("mobile-heading")}>
            <div className={cx("heading")}>
              <div className={cx("brand")}>{carDetails.brand || "Toyota"}</div>
              <div className={cx("action")}>
                <span
                  onClick={() => onHandleFavourite(carDetails.id)}
                  className={cx("favourite-btn", {
                    activeHeart: isFavourite,
                  })}
                >
                  <i className="fa-regular fa-heart"></i>
                </span>
                <span className={cx("share-btn")} onClick={onHandleShare}>
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
                  {carDetails.mileage?.toLocaleString("vi-VN") || "0"} km
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
                      {specs.items.map(
                        (specsInfo: InfoSpecsType, itemIndex) => (
                          <div key={itemIndex}>
                            <p>{specsInfo.label}</p>
                            <p>{specsInfo.value || "N/A"}</p>
                          </div>
                        ),
                      )}
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
                  className={cx("favourite-btn", {
                    activeHeart: isFavourite,
                  })}
                >
                  <i className="fa-regular fa-heart"></i>
                </span>
                <span className={cx("share-btn")} onClick={onHandleShare}>
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
                  {carDetails.mileage?.toLocaleString("vi-VN") || "0"} km
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
            <FormContact
              userInfo={userInfo}
              carDetail={carDetails}
            ></FormContact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsComponent;
