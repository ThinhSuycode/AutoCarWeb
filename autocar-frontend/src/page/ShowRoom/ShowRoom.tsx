import styles from "./ShowRoom.module.scss";
import classNames from "classnames/bind";
import { imgBannerData } from "../../data/ShowRoom";
import Banner from "../../components/Banner/Banner";
import ShowroomLocations from "./components/ShowroomLocations";
import ShowroomBooking from "./components/ShowroomBooking";
import ShowroomBenefits from "./components/ShowroomBenefits";
import ShowroomGallery from "./components/ShowroomGallery";

const cx = classNames.bind(styles);

const ShowRoom = () => {
  return (
    <div className={cx("showRoom-page")}>
      <Banner dataImg={imgBannerData} />

      <ShowroomLocations></ShowroomLocations>

      {/* Form đặt lịch */}
      <ShowroomBooking></ShowroomBooking>
      {/* Hình ảnh showroom */}
      <ShowroomGallery></ShowroomGallery>

      {/* Tại sao nên ghé */}
      <ShowroomBenefits></ShowroomBenefits>
    </div>
  );
};

export default ShowRoom;
