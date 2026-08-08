import classNames from "classnames/bind";
import styles from "./CarDetails.module.scss";
import NavigationPage from "../../components/NavigationPage/NavigationPage";
import LoadingData from "../../components/LoadingData/LoadingData";
import FormContact from "../../components/FormContact/FormContact";
import CarGallery from "./components/CarGallary/CarGallary";
import CarDescription from "./components/CarDescription/CarDescription";
import CarSpecs from "./components/CarSpecs/CarSpecs";
import CarHeader from "./components/CarHeader/CarHeader";
import CarMobile from "./components/CarMobile/CarMobile";
import useCarDetail from "./hooks/useCarDetail";

const cx = classNames.bind(styles);

const CarDetails = () => {
  const {
    id,
    carDetails,
    isLoading,
    userInfo,
    isFavourite,
    imgCurrent,
    isTransitioning,
    onChangeImg,
  } = useCarDetail();

  if (isLoading) {
    return <LoadingData message={"Đang tải dữ liệu"}></LoadingData>;
  }

  if (!carDetails || !id) {
    return <LoadingData message="Chi tiết xe chưa được cập nhật" />;
  }

  return (
    <div className={cx("carDetails-page")}>
      <NavigationPage
        pageActive="Xe đang bán"
        title={carDetails.carId.name || ""}
      />
      <div className={cx("content")}>
        <div className={cx("left")}>
          <CarGallery
            carDetails={carDetails}
            imgCurrent={imgCurrent}
            isTransitioning={isTransitioning}
            onChangeImg={onChangeImg}
          />
          <CarMobile
            carDetails={carDetails}
            isFavourite={isFavourite}
            userInfo={userInfo}
          ></CarMobile>
          <CarDescription
            description={carDetails.description ?? ""}
          ></CarDescription>
          <CarSpecs carDetails={carDetails}></CarSpecs>
        </div>
        <div className={cx("right")}>
          <CarHeader
            carDetails={carDetails}
            userInfo={userInfo}
            isFavourite={isFavourite}
          ></CarHeader>

          <div className={cx("content-bottom")}>
            <FormContact
              userInfo={userInfo ?? null}
              car={carDetails}
            ></FormContact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
