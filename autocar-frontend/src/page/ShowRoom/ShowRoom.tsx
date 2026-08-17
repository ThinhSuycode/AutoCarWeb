import styles from "./ShowRoom.module.scss";
import classNames from "classnames/bind";
import { imgBannerData } from "../../data/ShowRoom";
import ShowroomLocations from "./components/ShowroomLocations/ShowroomLocations";
import ShowroomBenefits from "./components/ShowroomBenefits/ShowroomBenefits";
import ShowroomGallery from "./components/ShowroomGallery/ShowroomGallery";
import ShowroomBanner from "../../components/ShowroomBanner/ShowroomBanner";

const cx = classNames.bind(styles);

const ShowRoom = () => {
  return (
    <div className={cx("showRoom-page")}>
      <ShowroomBanner listImage={imgBannerData} />

      <ShowroomLocations></ShowroomLocations>

      {/* Form đặt lịch */}
      {/* <ShowroomBooking></ShowroomBooking> */}
      {/* Hình ảnh showroom */}
      <ShowroomGallery></ShowroomGallery>

      {/* Tại sao nên ghé */}
      <ShowroomBenefits></ShowroomBenefits>
    </div>
  );
};

export default ShowRoom;
