import classNames from "classnames/bind";
import styles from "./CarDetails.module.scss";
import NavigationPage from "../../components/NavigationPage/NavigationPage";
import { useParams } from "react-router-dom";
import LoadingData from "../../components/LoadingData/LoadingData";
import FormContact from "../../components/FormContact/FormContact";
import { useCurrentUser } from "../../queries/useCurrentUser";
import { useCarDetail } from "../../queries/useCarDetail";
import { useCarGallery } from "./hooks/useCarGallery";
import CarGallery from "./components/CarGallary";
import useCarActions from "./hooks/useCarActions";
import CarDescription from "./components/CarDescription";
import CarSpecs from "./components/CarSpecs";
import CarHeader from "./components/CarHeader";
import CarMobile from "./components/CarMobile";

const cx = classNames.bind(styles);

const CarDetails = () => {
  const { id } = useParams();

  const { data: carDetails, isLoading } = useCarDetail(id);

  const { imgCurrent, isTransitioning, onChangeImg } = useCarGallery(
    carDetails?.images,
  );

  const isLogin = !!localStorage.getItem("token");

  const { data: userInfo } = useCurrentUser(isLogin);

  const { isFavourite } = useCarActions({
    userInfo,
    carDetails,
  });

  if (isLoading) {
    return <LoadingData message={"Đang tải dữ liệu"}></LoadingData>;
  }

  if (!carDetails || !id) {
    return <LoadingData message="Chi tiết xe chưa được cập nhật" />;
  }

  return (
    <div className={cx("carDetails-page")}>
      <NavigationPage pageActive="Xe đang bán" title={carDetails?.name || ""} />
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
